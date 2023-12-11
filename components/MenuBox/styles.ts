import { StyleSheet } from 'react-native';
import { theme } from '../../theme';
export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: theme.colors.backgroundLight,
    },
    button: {
        backgroundColor: theme.colors.main,
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: theme.colors.textPrimary,
        fontSize: 12,
    },
    textInput: {
        color: theme.colors.textPrimary,
        flex: 1,
    },
});
