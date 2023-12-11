import Clipboard from '@react-native-clipboard/clipboard';
import { Pressable, Text, ToastAndroid, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles as globalStyles } from '../../shared/styles';
import { Hash } from '../../shared/types/Hash';
import { theme } from '../../theme';
import { styles } from './styles';

interface hashListItemProps {
    hashVal: Hash;
}

const getMatchStyle = (isMatch: boolean) => {
    //Avoid falsy comparisons. Only change the backgroundColor if we have an actual boolean value
    if (isMatch === true) {
        return styles.match;
    } else if (isMatch === false) {
        return styles.noMatch;
    }
};

export const HashListItem = function ({ hashVal }: hashListItemProps) {
    let item = null;
    if (hashVal !== undefined && hashVal !== null) {
        item = (
            <>
                <View
                    style={[styles.container, getMatchStyle(hashVal.isMatch)]}
                >
                    <View
                        style={[
                            globalStyles.inlineFlexWrapper,
                            {
                                justifyContent: 'space-between',
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.textTitle,
                                globalStyles.inlineFlexWrapper,
                            ]}
                        >
                            {hashVal.algo}
                        </Text>
                        <Pressable
                            style={{
                                alignSelf: 'center',
                                backgroundColor: theme.colors.main,
                                padding: 5,
                                borderRadius: 5,
                            }}
                            onPress={() => {
                                Clipboard.setString(hashVal.hash);
                                ToastAndroid.show(
                                    `${hashVal.algo} hash copied to clipboard`,
                                    ToastAndroid.SHORT
                                );
                            }}
                        >
                            <Icon name="copy" size={20} color={'#fff'} />
                        </Pressable>
                    </View>
                    <Text
                        style={[
                            globalStyles.inlineFlexWrapper,
                            globalStyles.textLabel,
                        ]}
                    >
                        {hashVal.hash}
                    </Text>
                </View>
            </>
        );
    }
    return item;
};
