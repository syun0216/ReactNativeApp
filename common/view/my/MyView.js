/**
 * Created by Syun on 2017/1/23.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";
import LoginView from "../../LoginView";
import UserService from "../../account/UserServices";
import Toast from "../../utils/Toast";

export default class MyView extends Component {
    _userInfo = null;

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        }
    }

    componentWillMount() {
        UserService.getLoginUserJsonData((error, userInfo) => {
            if (error != null || userInfo == null) {
                Toast.showWithMessage("您尚未登录噢");
                return
            }
            this.setState({
                userInfo: userInfo
            })
        })
    }

    render() {
        return (
            <View style={BaseStyles.BaseContainer}>
                {this._renderTitleBar()}
                <Text>MyView</Text>
                {
                    this.state.userInfo == null ?
                        <TouchableOpacity onPress={() => this._toLogin()} style={styles.loginButton}>
                            <Text>登录</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => this._logOut()} style={styles.loginButton}>
                            <Text>退出登录</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }

    _renderTitleBar() {
        return (
            <TitleBar
                title="My"
                canBack={false}
                {...this.props}/>
        )
    }

    _toLogin() {
        this.props.navigator.push({
            name: "LoginView",
            component: LoginView
        })
    }

    _logOut(){
        Alert.alert(null, "退出当前账号?",
            [
                {
                    text: "确定", onPress: () => this._onPressToConfirmToQuit()
                },
                {text: "取消"}
            ]
        )
    }

    _onPressToConfirmToQuit(){
        UserService.clearStoreUser();
        this.setState({
           userInfo:null
        });
        Toast.showWithMessage("退出登录成功");
    }

}

const styles = StyleSheet.create({
    loginButton: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
});