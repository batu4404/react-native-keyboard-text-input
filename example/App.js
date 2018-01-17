import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import KeyboardTextInput from 'KeyboardTextInput';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleInputText: false,
            inputValue: 'a',
            placeholder: 'Enter your name'
        }
    }


    onFocus = () => {
        this.setState({
            visibleInputText: true,
        })
    } 


    onClose = () => {
        this.setState({
            visibleInputText: false,
        })
    }

    onEndEditing = () => {
        if (this.state.inputValue) {
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
                    onFocus={() => {this.setState({visibleInputText: true})}}
                    value={this.state.inputValue}
                    // keyboardType='numeric'
                    underlineColorAndroid='transparent'
                    onChangeText={this.onChangeText}
                />
                
                <KeyboardTextInput
                    value={this.state.inputValue}
                    visible={this.state.visibleInputText}
                    placeholder={this.state.placeholder}
                    onClose={this.onClose}
                    onEndEditing={this.onEndEditing}
                    onChangeText={this.onChangeText}
                    onFocus={this.onFocus}
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
