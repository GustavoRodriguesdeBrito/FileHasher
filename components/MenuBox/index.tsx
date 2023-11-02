import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../theme';
import { styles } from './styles';
export const MenuBox = function () {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.inlineFlexWrapper}>
                    <TextInput
                        style={styles.text_input}
                        editable={false}
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
                    onPress={() => {
                        ToastAndroid.show(
                            "'calculate hash' button clicked",
                            ToastAndroid.SHORT
                        );
                        //TODO: FileSystem.getInfoAsync
                    }}
                >
                    <Text style={styles.button_text}>Calculate Hash</Text>
                </Pressable>
            </View>
        </>
    );
};
