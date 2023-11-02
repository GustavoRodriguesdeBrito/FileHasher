import { StyleSheet } from 'react-native';
import { theme } from '../../theme';
export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: theme.colors.backgroundLight,
    },
    inlineFlexWrapper: {
        flexDirection: 'row',
        margin: 5,
    },
    button: {
        backgroundColor: theme.colors.main,
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
    },
    button_text: {
        color: theme.colors.text_primary,
        fontSize: 12,
    },
    text_input: {
        color: theme.colors.text_primary,
        flex: 1,
    },
    text_label: {
        color: theme.colors.text_primary,
    },
});
