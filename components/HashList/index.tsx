import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles as globalStyles } from '../../shared/styles';
import { Hash } from '../../shared/types/Hash';
import { theme } from '../../theme';
import { HashListItem } from '../HashListItem';

interface HashListProps {
    userHash: string;
    hashValues: Hash[];
    compareHashes: Function;
}

export const HashList = ({
    userHash,
    hashValues,
    compareHashes,
}: HashListProps) => {
    const [checkBoxState, setCheckBoxState] = useState<boolean>(false);
    return (
        <>
            <View>
                {/* prevent the checkbox from becoming invisible while checked */}
                {(userHash || checkBoxState) && (
                    <View
                        style={[
                            globalStyles.inlineFlexWrapper,
                            globalStyles.margin5,
                        ]}
                    >
                        <CheckBox
                            tintColors={{
                                true: theme.colors.main,
                                false: theme.colors.textPrimary,
                            }}
                            value={checkBoxState}
                            onValueChange={(newState) => {
                                setCheckBoxState(newState);
                                compareHashes(hashValues, userHash);
                            }}
                        />
                        <Text style={globalStyles.textLabel}>
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
