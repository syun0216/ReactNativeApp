/**
 * Created by Syun on 2017/1/24.
 * 用户登录界面
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import BaseStyles from './styles/BaseStyles';
import Colors from './utils/Colors';
import TitleBar from './components/TitleBar';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={BaseStyles.loginContainer}>
                { this._renderTitleBar()}
                <View>
                    <Text>login in</Text>
                </View>
            </View>
        )
    }

    _renderTitleBar() {
        return (
            <TitleBar
                title="登录"
                canBack={true}
                onBackPress={() => this.props.navigator.pop()}
            />
        )
    }


}