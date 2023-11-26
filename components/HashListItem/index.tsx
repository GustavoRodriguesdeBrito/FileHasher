import Clipboard from '@react-native-clipboard/clipboard';
import { Pressable, Text, ToastAndroid, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../theme';
import { styles } from './styles';

export const HashListItem = function ({ hashVal }) {
    let item = null;
    if (hashVal !== undefined && hashVal !== null) {
        item = (
            <>
                <View style={styles.container}>
                    <View
                        style={[
                            styles.inlineFlexWrapper,
                            {
                                justifyContent: 'space-between',
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.text_title,
                                styles.inlineFlexWrapper,
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
                    <Text style={[styles.text_label, styles.inlineFlexWrapper]}>
                        {hashVal.hash}
                    </Text>
                </View>
            </>
        );
    }
    return item;
};
