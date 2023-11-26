import { StyleSheet } from 'react-native';
import { theme } from '../../theme';
export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: theme.colors.backgroundLight,
        margin: 10,
        alignContent: 'center',
    },
    inlineFlexWrapper: {
        flexDirection: 'row',
    },
    text_label: {
        color: theme.colors.text_primary,
    },
    text_title: {
        color: theme.colors.text_primary,
        fontSize: 24,
    },
    noMatch: {
        backgroundColor: theme.colors.error_faded,
    },
    match: {
        backgroundColor: theme.colors.success_faded,
    },
});
