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
    StyleSheet,
    ScrollView
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";
import HttpServices from "../../http/HttpServices";
import CityData from '../../http/CityData';
import Colors from '../../utils/Colors';
import CityView from '../city/CityView';

export default class BookView extends Component{

    constructor(props){
        super(props);

    }

    componentWillMount() {

    }


    render(){
        return(
            <View style={BaseStyles.BaseContainer}>
                {this._renderTitleBar()}
                <ScrollView>
                    {this._renderCityList()}
                </ScrollView>
            </View>
        )
    }

    _renderTitleBar() {
        return (
            <TitleBar
                title="Book"
                canBack={false}
                {...this.props}/>
        )
    }

    _renderCityList(){
        return CityData.cityData.map((value,index) => {
            return (
            <TouchableOpacity key={`${index}`} style={BaseStyles.viewContainer}
                              onPress={() => this._goToCityDetails(value.province)}>
                <View>
                    <Text>
                        {value.province}
                    </Text>
                </View>
            </TouchableOpacity>
            )
        });
    }

    _goToCityDetails(val){
        this.props.navigator.push({
            name:"CityView",
            component:CityView,
            params:{
                provinceName:val
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