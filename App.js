import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { MenuBox } from './components/MenuBox';
import { theme } from './theme';

export default function App() {
    return (
        <View style={styles.parentContainer}>
            <StatusBar
                backgroundColor={theme.colors.background}
                style="inverted"
                translucent={false}
            />
            <MenuBox></MenuBox>
        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
        backgroundColor: theme.colors.background,
        flex: 1,
    },
});
