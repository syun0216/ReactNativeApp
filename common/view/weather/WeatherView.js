/**
 * Created by Syun on 2017/1/23.
 * 主页
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";
import HttpServices from "../../http/HttpServices";
import HttpRequestUrls from "../../http/HttpRequestUrls";
import Colors from "../../utils/Colors";

export default class WeatherView extends Component {
    _weatherData = null;

    constructor(props) {
        super(props);
        this.state = {
            currentSelectedService:"天气预报"
        }
    }

    componentWillMount() {
        HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_FORECAST + this.props.cityName, (res) => console.log(res), (error) => console.log(error));
    }


    render() {
        return (
            <View style={BaseStyles.BaseContainer}>
                {this._renderTitleBar()}
                {this._renderPageView()}
            </View>
        )
    }

    _renderTitleBar() {
        return (
            <TitleBar
                title={this.props.cityName}
                canBack={true}
                {...this.props}/>
        )
    }

    _renderPageView() {
        return (
            <View style={Styles.pageContainer}>
                <View style={Styles.listContainer}>
                    {this._renderListView()}
                </View>
                <View style={Styles.contentContainer}><Text>456</Text></View>
            </View>
        )
    }

    _renderListView(){
        let listData = ["天气预报","实况天气","每小时预报","生活指数","灾害预警"];
        return listData.map((value,idx) => {
            return (
            <TouchableOpacity key={`${idx}`} style={[Styles.listItemContainer,
                this.state.currentSelectedService == value ? Styles.listItemActive : null]}
                              onPress={() => this._selectService(value)}>
                <View>
                    <Text style={this.state.currentSelectedService == value ? {color:Colors.RED} : null}>
                        {value}
                    </Text>
                </View>
            </TouchableOpacity>
            )
        })
    }



    _selectService(value){
        this.setState({
            currentSelectedService:value
        });
        switch (value) {
            case "天气预报": this._getWeatherData(HttpRequestUrls.GET_CITY_WEATHER_FORECAST);break;
            case "实况天气": this._getWeatherData(HttpRequestUrls.GET_CITY_WEATHER_NOW);break;
            case "每小时预报": this._getWeatherData(HttpRequestUrls.GET_CITY_WEATHER_HOURLY);break;
            case "生活指数": this._getWeatherData(HttpRequestUrls.GET_CITY_WEATHER_SUGGESTION);break;
            case "灾害预警": this._getWeatherData(HttpRequestUrls.GET_CITY_WEATHER_ALARM);break;
        }
    }

    _getWeatherData(url){
        HttpServices.get(url + this.props.cityName,(res) => this._successCallBack(res),(error) => this._failCallBack(error));
    }

    _successCallBack(res){
        console.log(res);
    }

    _failCallBack(error){

    }

}

const Styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: "row",
        borderTopWidth:1,
        borderTopColor:Colors.MIDDLE_GRAY
    },
    listContainer: {
        width: 100,
        backgroundColor: Colors.WHITE,
        borderRightWidth:1,
        borderRightColor:Colors.MIDDLE_GRAY,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    listItemContainer:{
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderBottomWidth:1,
        borderBottomColor:Colors.MIDDLE_GRAY,
    },
    listItemActive:{
        borderLeftWidth:5,
        borderLeftColor:Colors.RED,
    }

});