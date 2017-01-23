/**
 * Created by Syun on 2017/1/23.
 * 主页
 */
'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";

export default class HomeView extends Component{
    render(){
        return(
            <View style={BaseStyles.BaseContainer}>
                {this._renderTitleBar()}
                <Text>HomeView</Text>
            </View>
        )
    }

    _renderTitleBar() {
        return (
            <TitleBar
                title="主页"
                canBack={false}
                {...this.props}/>
        )
    }
}