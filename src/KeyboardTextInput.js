import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet, 
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    TouchableWithoutFeedback,
    UIManager,
    Platform,
    Animated,
    Easing,
} from 'react-native';
import PropsType from 'prop-types';

const SLIDE_SHOW_DURATION = 200;
const SLIDE_HIDE_DURATION = 200;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class KeyboardTextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            footerHeight: 0,
            animating: false,
            animateValue: new Animated.Value(0),
            closed: true,
        }
    }

    componentWillMount() {
        this._listeners = [
            Keyboard.addListener('keyboardDidShow', this.keyboardShowListener),
            Keyboard.addListener('keyboardDidHide', this.keyboardHideListener)
        ];
    }
    
    componentWillUnmount() {
        this._listeners.forEach(listener => listener.remove());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({value: nextProps.value});
        }

        if (!this.props.visible && nextProps.visible) {
            this.setState({closed: false});
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (!this.props.visible && nextProps.visible && this.props.animate) {
            this.startSlideShow();
        }
    }

    startSlideShow() {
        let animateValue = new Animated.Value(WINDOW_HEIGHT);
        this.setState({animateValue}, () => {
            Animated.timing(this.state.animateValue, {
                toValue: 0,
                duration: SLIDE_SHOW_DURATION,
                easing: Easing.out(Easing.circle)
            }).start();
        });
    }

    startSlideHide(onFinish = () => null) {
        if (!this.state.animating) {
            let animateValue = new Animated.Value(0);
  
            this.setState({animating: true, animateValue}, () => {
                Animated.timing(this.state.animateValue, {
                    toValue: WINDOW_HEIGHT,
                    duration: SLIDE_HIDE_DURATION,
                }).start(() => {
                    this.setState({animating: false});
                    onFinish();
                });
            });
        }
    }

    measureFooterHeight(keyboardHeight) {
        if (this._containerRef) {
            this._containerRef.measure((frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
                let footerHeight = height - WINDOW_HEIGHT + keyboardHeight;
                this.setState({height, footerHeight});
            });
        }
    }

    
    keyboardShowListener = (e) => {
        if (this.keyboardTextInputRef && this.props.visible) {
            this.measureFooterHeight(e.endCoordinates.height);
            // this.keyboardTextInputRef.focus();
        }
    }

    keyboardHideListener = (e) => {
        if (this.props.visible && !this.state.closed && !this.state.animating) {
            let onClose = this.props.onClose;
            if (this.props.animate) {
                this.startSlideHide(() => {
                    this.close(onClose);
                });
            } else {
                this.close();
            }
        }
    }

    close(onClose) {
        if (!this.state.closed) {
            this.setState({closed: true, footerHeight: this.footerHeight - 20});
            if (onClose) {
                onClose();
            } else {
                this.props.onClose();
            }
        }
    }

    onEndEditing = () => {
        let onEndEditing = this.props.onEndEditing;
        if (this.props.animate) {
            let onClose = this.props.onClose; 
            this.startSlideHide(() => {
                this.close(onClose); 
                onEndEditing();
            });
        } else {
            this.close(); 
            onEndEditing();
        }
    }

    onSubmitEditing = () => {
        let onSubmitEditing = this.props.onSubmitEditing;

        if (this.props.animate) {
            let onClose = this.props.onClose; 
            this.startSlideHide(() => {
                this.close(onClose); 
                onSubmitEditing();
            });
        } else {
            this.close();
            onSubmitEditing();
        }
    }

    onChangeText = (text) => {
        this.setState({
            inputValue: text,
        });
        this.props.onChangeText(text);
    }

    handleTouchOnSpace = () => {
        Keyboard.dismiss();
    }

    renderContent() {
        return (
            <View
                style={styles.content}
                ref={(ref) => {this._containerRef = ref}}
            >
                <TouchableWithoutFeedback
                    onPress={this.handleTouchOnSpace}
                >
                    <View style={styles.flexOne} >
                    </View>
                </TouchableWithoutFeedback>
                
                <TextInput
                    accessibilityLabel={this.props.accessibilityLabel}
                    value={this.state.value}
                    keyboardType={this.props.keyboardType}
                    style={styles.input}
                    autoFocus={this.props.visible}
                    placeholder={this.props.placeholder}
                    ref={(ref) => this.keyboardTextInputRef = ref}
                    onChangeText={this.onChangeText}
                    onEndEditing={this.props.onEndEditing ? this.onEndEditing : null}
                    onSubmitEditing={this.props.onSubmitEditing ? this.onSubmitEditing : null}
                    underlineColorAndroid='transparent'
                />
                
                <View style={[{height: this.state.footerHeight}]} />
            </View>
        );
    }

    render() {
        if (this.props.visible || this.state.animating || !this.state.closed) {
            return (
                <View
                    style={[styles.container, this.state.closed ? styles.invisible : null]}
                >
                    <Animated.View 
                        style={[
                            styles.flexOne, 
                            this.props.animate ? 
                            {
                                transform: [{
                                    translateY: this.state.animateValue
                                }],
                            } : null
                        ]}
                    >
                        {this.renderContent()}
                    </Animated.View>
                </View>
            )
        } else {
            return null;
        }
    }
}

KeyboardTextInput.propTypes = {
    accessibilityLabel: PropsType.string,
    value: PropsType.string,
    keyboardType: PropsType.string,
    visible: PropsType.bool,
    animate: PropsType.bool,
    onChangeText: PropsType.func,
    onEndEditing: PropsType.func,
    onSubmitEditing: PropsType.func,
    onClose: PropsType.func.isRequired,
};

KeyboardTextInput.defaultProps = {
    accessibilityLabel: 'keyboard-text-input',
    value: '',
    keyboardType: 'default',
    visible: false,
    animate: false,
    onChangeText: () => null,
    onEndEditing: null,
    onSubmitEditing: null,
};

const styles = StyleSheet.create({
	container: {
        position: 'absolute', 
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,        
    },
    content: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    invisible: {
        height: 0,
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#AAA',
        padding: 10
    },
    flexOne: {
        flex: 1,
    }
});