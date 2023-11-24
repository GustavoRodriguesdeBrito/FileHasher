import { useState } from 'react';
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import DocumentPicker, {
    DocumentPickerResponse,
    isCancel,
} from 'react-native-document-picker';
import * as FS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Hash } from '../../shared/types/Hash';
import { theme } from '../../theme';
import { styles } from './styles';

export const MenuBox = function () {
    const [docPickResult, setDocPickResult] = useState<
        DocumentPickerResponse | undefined | null
    >();

    const [hashValues, setHashValues] = useState<
        Array<Hash> | undefined | null
    >([]);

    const algos = ['md5', 'sha1', 'sha256', 'sha512'];

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
                        <Icon name="folder-open" size={10} color={'#fff'} />
                    </Pressable>
                </View>
                <View style={styles.inlineFlexWrapper}>
                    <TextInput
                        style={styles.text_input}
                        placeholder="Insert the hash to compare here"
                        placeholderTextColor={theme.colors.text_primary_faded}
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
                                arrResults.push({ algo, hash });
                                setHashValues(arrResults);
                            }
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
        </>
    );
};
