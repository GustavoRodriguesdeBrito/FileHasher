import { StyleSheet } from 'react-native';
import { theme } from '../../theme';
export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: theme.colors.backgroundLight,
        margin: 10,
        alignContent: 'center',
    },
    textTitle: {
        color: theme.colors.textPrimary,
        fontSize: 24,
    },
    noMatch: {
        backgroundColor: theme.colors.errorFaded,
    },
    match: {
        backgroundColor: theme.colors.successFaded,
    },
});
