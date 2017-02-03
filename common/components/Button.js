/**
 * Created by Syun on 2017/2/3.
 * 自定义组件Button
 */

'use strict';

import React, {
    Component,
} from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'


export default class Button extends Component {

    static propTypes = {
        disabled: React.PropTypes.bool,
        style: View.propTypes.style,
        disabledStyle: View.propTypes.style,
        textStyle: Text.propTypes.style,
        disabledTextStyle: Text.propTypes.style,
        title: React.PropTypes.string,
        onPress: React.PropTypes.func
    }

    _disabledStyle = null;
    _disabledTextStyle = null;

    constructor(props) {
        super(props);

        this._disabledStyle = props.disabledStyle == null ? props.style : props.disabledStyle;
        this._disabledTextStyle = props.disabledTextStyle == null ? props.textStyle : props.disabledTextStyle;
    }

    render() {
        let viewStyle = this.props.disabled ? this._disabledStyle : this.props.style;
        let textStyle = this.props.disabled ? this._disabledTextStyle : this.props.textStyle;

        return (
            <TouchableOpacity style={[styles.viewStyle, viewStyle]} disabled={this.props.disabled} onPress={this.props.onPress}>
                <Text style={textStyle}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({

    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})