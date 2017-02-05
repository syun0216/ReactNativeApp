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
import HttpRequestUrls from "../../http/HttpRequestUrls";
import CityData from '../../http/CityData';
import Colors from '../../utils/Colors';

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
            <TouchableOpacity key={`${index}`} style={Styles.viewContainer}
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

    _goToCityDetails(res){
        console.log(res);
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

const Styles = StyleSheet.create({
    viewContainer:{
        height:50,
        borderBottomWidth:1,
        justifyContent:"center",
        borderColor:Colors.MIDDLE_GRAY
    }
})