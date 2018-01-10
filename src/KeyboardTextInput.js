import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    DeviceEventEmitter,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import PropsType from 'prop-types';
import { setTimeout } from 'core-js/library/web/timers';
import { getPropsWithoutFunction } from './utils';

export default class KeyboardTextInput extends Component {
    constructor(props) {
        super(props);

        let propsWithoutFunction = getPropsWithoutFunction(this.props);

        this.state = {
            value: this.props.value,
            modalVisible: false,
            propsWithoutFunction,
        }
    }

    componentWillReceiveProps (nextProps) {
        let propsWithoutFunction = getPropsWithoutFunction(this.props);
        let value = nextProps.value;

        this.setState({value, propsWithoutFunction});
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.modalVisible) {
            this.registerKeyboardEvent();
        }
    }

    registerKeyboardEvent = () => {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    unregisterKeyboardEvent = () => {
        this.keyboardDidHideListener.remove();
    }
    
    _keyboardDidHide = (e) => {
        if (this.state.modalVisible) {
            // to fix "trying to add local data to unkown tag ..." (haven't known reason)
            setTimeout(() => {
                this.onEndEditing();
            }, 20);
        }
    }

    onPress = () => {
        this.setState({modalVisible: true});
    }

    onFocus = () => {
        this.registerKeyboardEvent();
    }

    onEndEditing = () => {
        this.unregisterKeyboardEvent();
        this.setState({modalVisible: false});

        this.props.onEndEditing(this.state.value);
    }

    onChangeText = (text) => {
        this.setState({
            value: text,
        });
        this.props.onChangeText(text);
    }

    handleTouchOnSpace = () => {
        this.onEndEditing();
    }

    renderModal() {
        const {
            style,
            value,
            editable,
            ...restProps
        } = this.state.propsWithoutFunction;

        return (
            <Modal
                onRequestClose={() => {this.props.onClose()}}
                visible={this.state.modalVisible}
                transparent={true}
                animationType='slide'
            >      
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback
                        onPress={this.handleTouchOnSpace}
                    >
                        <View style={styles.flexOne} />
                    </TouchableWithoutFeedback>

                    <View>
                        <TextInput
                            placeholder={this.props.placeholder}
                            style={[styles.keyboardInput, this.props.inputStyle]}
                            onFocus={this.onFocus}
                            value={this.state.value}
                            autoFocus={this.state.modalVisible}
                            onEndEditing={this.onEndEditing}
                            onChangeText={this.onChangeText}
                            underlineColorAndroid='transparent'
                            {...restProps}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    render() {	
        const {
            style,
            value,
            editable,
            ...restProps
        } = this.state.propsWithoutFunction;

        return (
            <View>
                {this.renderModal()}

                <TextInput 
                    value={this.state.value}
                    style={[this.props.style, editable ? styles.editable : styles.readOnly, style]}
                    numberOfLines={1}
                    placeholder={this.props.placeholder}
                    underlineColorAndroid='transparent'
                    editable={false}
                    {...restProps}
                />
                <View
                    onPress={this.onPress}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                >
                    <TouchableWithoutFeedback 
                        onPress={this.onPress}
                    >
                        <View style={styles.flexOne} />
                    </TouchableWithoutFeedback>
                </View> 
            </View>
        )
    }
}

KeyboardTextInput.propTypes = {
    value: PropsType.string,
    keyboardType: PropsType.string,
    editable: PropsType.bool,
    onEndEditing: PropsType.func,
    onChangeText: PropsType.func,
}

KeyboardTextInput.defaultProps = {
    value: undefined,
    keyboardType: 'default',
    editable: true,
    onEndEditing: () => null,
    onChangeText: () => null,
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#AAA',
        paddingLeft: 10,
    },
    keyboardInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#AAA',
        paddingLeft: 10,
    },
    editable: {
        backgroundColor: 'white',
    },
    readOnly: {
        backgroundColor: 'whitesmoke',
    },
    flexOne: {
        flex: 1,
    }
});