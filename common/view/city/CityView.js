/**
 * Created by Syun on 2017/2/5.
 * movie view
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
    ScrollView
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";
import HttpServices from "../../http/HttpServices";
import CityData from "../../http/CityData";

export default class MovieView extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount() {
        console.log(this.props.provinceName);
    }


    render(){
        return(
            <View style={BaseStyles.BaseContainer}>
                {this._renderTitleBar()}
                <ScrollView>
                    {this._renderCityView()}
                </ScrollView>
            </View>
        )
    }

    _renderTitleBar() {
        return (
            <TitleBar
                title="Citys"
                canBack={true}
                {...this.props}/>
        )
    }

    _renderCityView(){
        return CityData.cityData.map((value) => {
            if(this.props.provinceName == value.province){
               return value.city.map((value,idx) => {
                    console.log(value.cityName);
                    return (
                        <TouchableOpacity style={BaseStyles.viewContainer} key={`${idx}`}>
                            <View>
                                <Text>{value.cityName}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }

        })
    }

    _onPressToFetchData(){
        HttpServices.get('https://api.douban.com/v2/province/1220562',(res)=>this.successCallBack(res),(err)=>this.failCallBack(err));
    }

    successCallBack(res){
        console.log(res);
    }

    failCallBack(err){
        console.log(err);
    }

}
