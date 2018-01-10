import React from "react";
import { StyleSheet, Text, View, TextInput, Keyboard } from "react-native";
import KeyboardTextInputPrompt from 'react-native-keyboard-text-input';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue1: 'Nguyen Van An 1',
            inputValue2: 'Nguyen Van An 2',
            inputValue3: 'Nguyen Van An 3',
        }

        this.registerKeyboardEvent();
    }

    registerKeyboardEvent = () => {
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
    }

    unregisterKeyboardEvent = () => {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
        // this.keyboardWillHideListener.remove();
    }
    
    _keyboardDidShow = (e) => {
    }

    _keyboardDidHide = (e) => {
        console.log('keyboard did hide');
    }

    _keyboardWillHide = (e) => {
        console.log('keyboard will hide');
        // Keyboard.dismiss();
        // this.onEndEditing();
    }

    onChangeText = (text) => {
        console.log("text", text);
        this.setState({inputValue: text});
    }

    onEndEditing = (text) => {
        console.log(1);
    }
    

    render() {
        return (
            <View
                style={styles.container}
            > 

                <TextInput 
                    placeholder={"Enter some thing"}
                />

                <KeyboardTextInputPrompt 
                    style={styles.input}
                    // value={this.state.inputValue1}
                    keyboardStyle=""
                    numberOfLines={1}
                    placeholder={"Enter some thing"}
                    // onChangeText={this.onChangeText}
                    // onEndEditing={this.onEndEditing}
                />

                <KeyboardTextInputPrompt 
                    style={styles.input}
                    value={this.state.inputValue2}
                    multiline={true}
                    placeholder={"Enter an apple"}
                    // onChangeText={this.onChangeText}
                    // onEndEditing={this.onEndEditing}
                />

                <KeyboardTextInputPrompt 
                    style={styles.input}
                    value={this.state.inputValue3}
                    secureTextEntry={true}
                    numberOfLines={1}
                    placeholder={"Enter password"}
                    // onChangeText={this.onChangeText}
                    // onEndEditing={this.onEndEditing}
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
        backgroundColor: 'skyblue',
        paddingLeft: 15,
        paddingRight: 15,
    }
});
