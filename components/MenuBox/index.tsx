import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native';
import DocumentPicker, {
    DocumentPickerResponse,
    isCancel,
} from 'react-native-document-picker';
import * as FS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Hash } from '../../shared/types/Hash';
import { theme } from '../../theme';
import { HashListItem } from '../HashListItem';
import { styles } from './styles';

export const MenuBox = function () {
    const [docPickResult, setDocPickResult] = useState<
        DocumentPickerResponse | undefined | null
    >();

    const [hashValues, setHashValues] = useState<
        Array<Hash> | undefined | null
    >([]);

    const [userHash, setUserHash] = useState<string>();

    const [checkBoxState, setCheckBoxState] = useState<boolean>(false);

    const algos = ['md5', 'sha1', 'sha256', 'sha512'];

    const compareHashes = (hashes: Array<Hash>, hashToCompare: string) => {
        for (let hash of hashes) {
            if (hashToCompare || hashToCompare !== '') {
                hash.isMatch = hash.hash === hashToCompare;
            } else {
                hash.isMatch = null;
            }
        }
    };

    const hashFile = async (file: string, algo: string) => {
        try {
            return await FS.hash(file, algo);
        } catch (error) {
            console.error('FS-ERROR: ', error);
            return '';
        }
    };

    const pickFile = async () => {
        try {
            const docPickResult = await DocumentPicker.pick({
                copyTo: 'cachesDirectory',
                presentationStyle: 'fullScreen',
            });
            //store the result to use the uri later
            setDocPickResult(docPickResult[0]);
            setHashValues([]);
        } catch (error) {
            if (isCancel(error)) {
                console.warn('DocPick cancelled');
            } else {
                console.error('DOC-PICKER-ERROR: ', error);
            }
        }
    };

    const uriValue = docPickResult?.uri ?? '';

    return (
        <>
            <View style={styles.container}>
                <View style={styles.inlineFlexWrapper}>
                    <TextInput
                        style={styles.text_input}
                        editable={false}
                        multiline={true}
                        scrollEnabled={true}
                        value={uriValue}
                        placeholder="File Path"
                        placeholderTextColor={theme.colors.text_primary_faded}
                    />
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            ToastAndroid.show(
                                'file selector button clicked',
                                ToastAndroid.SHORT
                            );
                            pickFile();
                        }}
                    >
                        <Icon name="folder-open" size={15} color={'#fff'} />
                    </Pressable>
                </View>
                <View style={styles.inlineFlexWrapper}>
                    <TextInput
                        style={styles.text_input}
                        placeholder="Insert the hash to compare here"
                        placeholderTextColor={theme.colors.text_primary_faded}
                        onChangeText={(newUserHash) => {
                            compareHashes(hashValues, newUserHash);
                            setUserHash(newUserHash);
                        }}
                        value={userHash}
                    />
                </View>
                <Pressable
                    style={[styles.button, { marginTop: 15 }]}
                    onPress={async () => {
                        if (docPickResult == undefined) {
                            ToastAndroid.show(
                                'Please select a file first',
                                ToastAndroid.SHORT
                            );
                            return;
                        }
                        try {
                            let arrResults = [];
                            for (const algo of algos) {
                                let hash = await hashFile(
                                    docPickResult.fileCopyUri,
                                    algo
                                );
                                let isMatch: boolean;
                                if (userHash) {
                                    isMatch = hash === userHash;
                                }
                                arrResults.push({ algo, hash, isMatch });
                            }
                            setHashValues(arrResults);
                        } catch (error) {
                            console.error(
                                "ERROR ON 'CALCULATE HASH' BUTTON OPERATION: ",
                                error
                            );
                        }
                    }}
                >
                    <Text style={styles.button_text}>Calculate Hash</Text>
                </Pressable>
            </View>
            <View>
                {/* prevent the checkbox from becoming invisible while checked */}
                {(userHash || checkBoxState) && (
                    <View style={styles.inlineFlexWrapper}>
                        <CheckBox
                            tintColors={{
                                true: theme.colors.main,
                                false: theme.colors.text_primary,
                            }}
                            value={checkBoxState}
                            onValueChange={(newState) => {
                                setCheckBoxState(newState);
                                compareHashes(hashValues, userHash);
                            }}
                        />
                        <Text style={styles.text_label}>
                            Show only matching hashes
                        </Text>
                    </View>
                )}

                <ScrollView>
                    {hashValues.map((hashResult, idx) => {
                        const element = (
                            <HashListItem key={idx} hashVal={hashResult} />
                        );
                        if (checkBoxState) {
                            return hashResult.isMatch && element;
                        }
                        return element;
                    })}
                </ScrollView>
            </View>
        </>
    );
};
