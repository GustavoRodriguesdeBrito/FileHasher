import { Text, View } from 'react-native';
import { styles } from './styles';

export const HashListItem = function ({ hashVal }) {
    let item = null;
    if (hashVal !== undefined && hashVal !== null) {
        item = (
            <View style={styles.container}>
                <Text style={[styles.text_title, styles.inlineFlexWrapper]}>
                    {hashVal.algo}
                </Text>
                <Text style={[styles.text_label, styles.inlineFlexWrapper]}>
                    {hashVal.hash}
                </Text>
            </View>
        );
    }
    return item;
};
