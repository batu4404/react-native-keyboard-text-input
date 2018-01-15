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

let id = 1;

export default class KeyboardTextInput extends Component {
    constructor(props) {
        super(props);

        let propsWithoutFunction = getPropsWithoutFunction(this.props);

        this.state = {
            value: this.props.value,
            modalVisible: false,
            propsWithoutFunction,
            id: id++,
        }
    }

    componentWillMount() {
        console.log('will mount');
        this.unregisterKeyboardEvent();
        this.registerKeyboardEvent();
    }

    componentWillReceiveProps (nextProps) {
        let propsWithoutFunction = getPropsWithoutFunction(this.props);
        let value = nextProps.value;

        this.setState({value, propsWithoutFunction});
    }

    componentWillUpdate(nextProps, nextState) {
        // if (nextState.modalVisible) {
        //     console.log('update');
        //     this.registerKeyboardEvent();
        // }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextState.modalVisible', nextState.modalVisible);
        return true;
    }

    registerKeyboardEvent = () => {
        console.log('register keyboard', this.state.id);
        Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    unregisterKeyboardEvent = () => {
        Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
        // this.keyboardDidHideListener.remove();
    }
    
    _keyboardDidHide = (e) => {
        console.log('keyboard did hide', this.state.id);
        if (this.state.modalVisible) {
            this.onEndEditing();
        }
    }

    onPress = () => {
        this.setState({modalVisible: true});
    }

    onFocus = () => {
        this.registerKeyboardEvent();
    }

    onEndEditing = () => {
        console.log('end editing');
        // this.unregisterKeyboardEvent();
        this.setState({modalVisible: false}, () => {
            console.log('modal visible', this.state.modalVisible);
            // this.unregisterKeyboardEvent();
            this.props.onEndEditing();
        });

        setTimeout(() => {
            this.setState({modalVisible: false}, () => {
                console.log('modal visible', this.state.modalVisible);
                // this.unregisterKeyboardEvent();
                this.props.onEndEditing();
            });
        }, 100);
    }

    onChangeText = (text) => {
        this.setState({
            value: text,
        });
        this.props.onChangeText(text);
    }

    onRequestClose = () => {
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

        console.log('modal', this.state.id);
        console.log(`modal visible ${this.state.id} - ${this.state.modalVisible}`);

        return (
            <Modal
                onRequestClose={this.onRequestClose}
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
                            ref={(ref) => this._textInput = ref}
                            placeholder={this.props.placeholder}
                            style={[styles.keyboardInput, this.props.inputStyle]}
                            // onFocus={this.onFocus}
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
            textStyle,
            ...restProps
        } = this.state.propsWithoutFunction;

        console.log('render', this.state.id);

        return (
            <View
                style={[editable ? styles.editable : styles.readOnly, style]}
            >
                {this.renderModal()}

                <TextInput 
                    value={this.state.value}
                    style={[textStyle, {flex: 1}]}
                    placeholder={this.props.placeholder}
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