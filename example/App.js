import React from "react";
import { StyleSheet, Text, View, TextInput, Keyboard, Alert } from "react-native";
import KeyboardTextInputPrompt from 'react-native-keyboard-text-input';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Cavoi',
            phone: '0123456789',
            desciption: 'I am a human',
        }
    }

    onEndEditing = () => {
        Alert.alert('Hello ' + this.state.name);
    }

    render() {
        return (
            <View
                style={styles.container}
            > 
                <KeyboardTextInputPrompt 
                    style={styles.input}
                    value={this.state.name}
                    placeholder={"Enter your name"}
                    onChangeText={(text) => this.setState({name: text})}
                    onEndEditing={this.onEndEditing}
                />

                <KeyboardTextInputPrompt 
                    style={styles.input}
                    value={this.state.phone}
                    keyboardType={"numeric"}
                    placeholder={"Enter your phone"}
                    onChangeText={(text) => this.setState({phone: text})}
                />

                <KeyboardTextInputPrompt 
                    style={styles.input}
                    value={this.state.desciption}
                    multiline={true}
                    placeholder={"Describe yourself"}
                    onChangeText={(text) => this.setState({desciption: text})}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        margin: 10,
        width: 200,
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
    }
});
