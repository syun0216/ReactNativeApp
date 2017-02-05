/**
 * Created by Syun on 2017/2/5.
 * music view
 */

/**
 * Created by Syun on 2017/1/23.
 * 主页
 */
'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";
import HttpServices from "../../http/HttpServices";
import HttpRequestUrls from "../../http/HttpRequestUrls";

export default class MusicView extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount() {

    }


    render(){
        return(
            <View style={BaseStyles.BaseContainer}>
                {this._renderTitleBar()}
                <TouchableOpacity onPress={()=>this._onPressToFetchData()}>
                    <Text>fetch data</Text>
                </TouchableOpacity>
                <Text>MusicView</Text>
            </View>
        )
    }

    _renderTitleBar() {
        return (
            <TitleBar
                title="Music"
                canBack={false}
                {...this.props}/>
        )
    }

    _onPressToFetchData(){
        HttpServices.get('https://api.douban.com/v2/book/1220562',(res)=>this.successCallBack(res),(err)=>this.failCallBack(err));
    }

    successCallBack(res){
        console.log(res);
    }

    failCallBack(err){
        console.log(err);
    }

}
