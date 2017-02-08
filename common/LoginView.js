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
import TextSizes from './utils/TextSizes';
import Button from './components/Button';
import Toast from './utils/Toast';
import HttpServices from './http/HttpServices';
import HttpRequestUrls from './http/HttpRequestUrls';
import FullScreenLoadingView from './components/FullScreenLoadingView';
import UserServices from './account/UserServices';

export default class LoginView extends Component {
    TIMER = null;
    loginDisabled = true;

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            smsCode: '',
            sendButton: "发送验证码",
            sendButtonDisabled:false,
            isLoading:false
        }
    }

    render() {
        return (
            <View style={BaseStyles.BaseContainer}>
                { this._renderTitleBar()}
                <View style={BaseStyles.loginContainer}>
                    { this._renderPhoneInput() }
                    { this._renderSmsCodeInput() }
                    { this._renderButtonView() }
                </View>
                {
                    this.state.isLoading ? this._renderLoadingView() : null
                }
            </View>
        )
    }

    _renderLoadingView(){
        return (
            <FullScreenLoadingView
                message="正在请求中..."/>
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

    _renderPhoneInput() {
        return (
            <View style={styles.InputContainer}>
                <TextInput
                    style={styles.Input}
                    multiline={false}
                    autoFocus={false}
                    underlineColorAndroid={Colors.TRANSPARENT}
                    placeholder='请输入手机号码'
                    keyboardType='numeric'
                    clearButtonMode='while-editing'
                    maxLength={11}
                    placeholderTextColor='gray'
                    returnKeyType="done"
                    onChangeText={(text) => this.handlePhoneInput(text)}
                />
                <TouchableOpacity
                    onPress={() => this.onPressSendQrCode()}
                    disabled={this.state.sendButtonDisabled}
                    style={styles.sendCodeBtn}
                >
                    <Text style={this.state.sendButtonDisabled ? {color:Colors.MIDDLE_GRAY} : {color:Colors.RED}}>
                        {this.state.sendButton}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderSmsCodeInput() {
        return (
            <View style={styles.InputContainer}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <TextInput
                        multiline={false}
                        autoFocus={false}
                        style={styles.Input}
                        underlineColorAndroid={Colors.TRANSPARENT}
                        placeholder='请输入验证码'
                        keyboardType='numeric'
                        clearButtonMode='while-editing'
                        placeholderTextColor='gray'
                        maxLength={6}
                        returnKeyType='done'
                        onChangeText={(text) => this.handleSmsCodeInput(text)}
                    />

                </View>
            </View>
        )
    }

    _renderButtonView() {
        let _disabled = !(this.state.phone.length >= 1 && this.state.smsCode.length >= 1);
        return (
            <Button
                title="立即登录"
                disabled={_disabled}
                style={[styles.loginBtn,_disabled ? {backgroundColor:Colors.MIDDLE_GRAY} : {backgroundColor:Colors.RED}]}
                textStyle={{color: Colors.WHITE}}
                onPress={() => this._login()}/>
        )
    }

    _login(){
        if(this.state.phone.length == 0){
            Toast.showWithMessage("电话号码输入不正确");
        }
        else if(this.state.smsCode.length == 0){
            Toast.showWithMessage("验证码输入不正确");
        }
        else{
            this.setState({isLoading:true});
            HttpServices.post(HttpRequestUrls.LOGIN_BY_PASSWORD,`phone=${this.state.phone}&msmcode=${this.state.smsCode}`,
                (res) => {
                    if(res.resultCode == 200 && res.data != null){
                        this.setState({isLoading:false});
                        UserServices.setLoginUserJsonData(res.data);
                        Toast.showWithMessage("登录成功！");
                        this.props.navigator.pop();
                    }
                },(error) => Toast.showWithMessage("登录失败!"))
        }
    }

    countDown() {
        let countSecond = 10;

        this.setState({
            sendButtonDisabled:true
        });

        this.TIMER = setInterval(() => {
            if (countSecond <= 1) {
                this.setState({
                    sendButton: '重新发送',
                    sendButtonDisabled:false
                });
                clearInterval(this.TIMER);
            }
            else {
                countSecond -- ;
                this.setState({
                    sendButton: countSecond + 's后重发'
                })
            }
        }, 1000)

    }

    handlePhoneInput(text) {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(text)) {
            this.setState({
                phone: text
            })
        }
    }

    handleSmsCodeInput(text) {
        if(text.length == 6){
            this.setState({
                smsCode:text
            });
        }
    }

    onPressSendQrCode() {
        if(this.state.phone.length == 0){
            Toast.showWithMessage('电话号码输入错误~')
        }
        else{
            this.setState({isLoading:true});
            HttpServices.post(HttpRequestUrls.GET_SMS_CODE,`phone=${this.state.phone}`,
                (res) => {
                    this.setState({isLoading:false});
                    if(res.resultCode == 200){
                        Toast.showWithMessage("短信发送成功~");
                    }
                    else{
                        Toast.showWithMessage("短信发送失败~")
                    }
                },(error) => {this.setState({isLoading:false});Toast.showWithMessage("短信发送失败~")});
            this.countDown();
        }
    }

}

const styles = StyleSheet.create({
    InputContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: Colors.MIDDLE_GRAY,
    },
    Input: {
        height: 50,
        flex: 1,
        backgroundColor: Colors.TRANSPARENT,
        color: Colors.MIDDLE_GRAY,
        fontSize: TextSizes.SIZE_16
    },
    sendCodeBtn: {
        justifyContent: "center"
    },
    loginBtn: {
        height: 50,
        marginTop: 65,

    }
});