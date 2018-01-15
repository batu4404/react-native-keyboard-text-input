import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import KeyboardTextInput from 'KeyboardTextInput';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleInputPrompt: false,
            visibleInputText: false,
            inputValue: 'a',
            placeholder: 'Enter your name'
        }

        this.registerKeyboardEvent();
    }

    registerKeyboardEvent = () => {
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    unregisterKeyboardEvent = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    _keyboardDidShow = (e) => {
        console.log('keyboard shown')
    }

    _keyboardDidHide = (e) => {
        console.log('keyboard hiden');
        this.setState({visibleInputPrompt: false});
    }


    onFocus = () => {
        this.setState({
            visibleInputPrompt: true,
        })
    } 


    onClose = () => {
        console.log('close');
        this.setState({
            visibleInputPrompt: false,
        })
    }

    onEndEditing = () => {
        if (this.state.inputValue) {
            // console.log('1')
            Alert.alert(`Hello ${this.state.inputValue}`);
        }
    }

    onChangeText = (text) => {
        this.setState({inputValue: text});
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput 
                    placeholder={this.state.placeholder}
                    style={styles.input}
                    onFocus={() => this.onFocus()}
                    value={this.state.inputValue}
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'
                />

                <TextInput 
                    placeholder={this.state.placeholder}
                    style={styles.input}
                    onFocus={() => {this.setState({visibleInputText: true})}}
                    value={this.state.inputValue}
                    // keyboardType='numeric'
                    underlineColorAndroid='transparent'
                    onChangeText={() => console.log('hello world')}
                />
                
                <KeyboardTextInput
                    value={this.state.inputValue}
                    visible={this.state.visibleInputText}
                    placeholder={this.state.placeholder}
                    onClose={() => {console.log('close'); this.setState({visibleInputText: false})}}
                    onEndEditing={this.onEndEditing}
                    onChangeText={this.onChangeText}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 50,
        backgroundColor: 'skyblue',
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        marginTop: 15,
    }
})
