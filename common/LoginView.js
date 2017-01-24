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

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:null,
            smsCode:null
        }
    }

    render() {
        return (
            <View style={BaseStyles.BaseContainer}>
                { this._renderTitleBar()}
                <View style={BaseStyles.loginContainer}>
                    { this._renderPhoneInput() }
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

    _renderPhoneInput(){
        return(
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
                    onChangeText={(text)=>this.handlePhoneInput(text)}
                />
            </View>
        )
    }

    _renderSmsCodeInput(){
        return (
            <View style={styles.InputContainer}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
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
                        onChangeText={(text)=>this.handleSmsCodeInput(text)}
                    />
                    <TouchableOpacity
                        onPress={()=>this.onPressSendQrCode()}
                        disabled={this.disaled}
                    >
                        <Text>
                            {this.state.sendButton}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    handlePhoneInput(text){
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(reg.test(text)){
            this.setState({
                phone:text
            })
        }
    }

    handleSmsCodeInput(text){

    }

}

const styles = StyleSheet.create({
    InputContainer:{
        flex:1,
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:Colors.MIDDLE_GRAY,
    },
    Input:{
        height:50,
        flex:1,
        backgroundColor:Colors.TRANSPARENT,
        color:Colors.MIDDLE_GRAY,
        fontSize:TextSizes.SIZE_16
    }
});