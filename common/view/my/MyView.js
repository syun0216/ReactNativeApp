/**
 * Created by Syun on 2017/1/23.
 */
'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";
import LoginView from "../../LoginView";

export default class MyView extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={BaseStyles.BaseContainer}>
                {this._renderTitleBar()}
                <Text>MyView</Text>
                <TouchableOpacity onPress={()=>this._toLogin()}>
                    <Text>login in</Text>
                </TouchableOpacity>
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

    _toLogin(){
        this.props.navigator.push({
            name:"LoginView",
            component:LoginView
        })
    }
}