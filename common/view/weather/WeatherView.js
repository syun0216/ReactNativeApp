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
import FullScreenLoadingView from '../../components/FullScreenLoadingView';
import WeatherIconData from "../../utils/WeatherIconData";

export default class WeatherView extends Component {
    _weatherData = null;

    constructor(props) {
        super(props);
        this.state = {
            currentSelectedService:"天气预报",
            isLoading:true
        }
    }

    componentWillMount() {
        HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_FORECAST + this.props.cityName,
            (res) => {
            this._weatherData = res.HeWeather5[0].daily_forecast;
            this.setState({
                isLoading:false
            });
            console.log(this._weatherData);
        },
            (error) => console.log(error));
    }


    render() {
        return (
            <View style={BaseStyles.BaseContainer}>
                {this._renderTitleBar()}
                {this._renderPageView()}
                {
                    this.state.isLoading ? this._renderLoadingView() : null
                }
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

    _renderLoadingView(){
        return (
            <FullScreenLoadingView
                message="正在加载中..."/>
        )
    }

    _renderPageView() {
        return (
            <View style={Styles.pageContainer}>
                <View style={Styles.listContainer}>
                    {this._renderListView()}
                </View>
                <View style={Styles.contentContainer}>
                    {
                        this._weatherData != null ? this._renderContentView() : null
                    }
                </View>
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

    _renderContentView(){
        if(this._weatherData == null){
            return;
        }
        switch (this.state.currentSelectedService){
            case "天气预报":
                console.log(this._weatherData);
                return this._weatherData.map((value,idx) => {
                    return (
                        <View key={`${idx}`}>
                            <View>
                                <Text>{value.date}</Text>
                                <Text>天文数值:</Text>
                                <Text>月升时间{value.astro.mr}</Text>
                                <Text>月落时间{value.astro.ms}</Text>
                                <Text>日出时间{value.astro.sr}</Text>
                                <Text>日落时间{value.astro.ss}</Text>
                                <Text>天气状况:</Text>
                                <Text>白天天气:{this._renderWeatherIconView(value.cond.code_d)}</Text>
                                <Text>{value.cond.text.d}</Text>
                                <Text>夜间天气:{this._renderWeatherIconView(value.cond.code_n)}</Text>
                                <Text>{value.cond.text_n}</Text>
                            </View>
                        </View>
                    )
                });break;
            case "实况天气" :
                return null;
            case "每小时预报":
                return null;
            case "生活指数":
                return null;
            case "灾害预警":
                return null;
        }
    }

    _renderWeatherIconView(code){
        WeatherIconData.weatherData.map((value) => {
            if(value.code == code){
                return (
                    <Image style={{width:40,height:40}} source={{uri:value.url}}/>
                )
            }
        })

    }



    _selectService(value){
        if(value == this.state.currentSelectedService){
            return
        }
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
        let _data = res.HeWeather5[0];
        switch (this.state.currentSelectedService){
            case "天气预报": this._weatherData = _data.daily_forecast;break;
            case "实况天气": this._weatherData = _data.now;break;
            case "每小时预报": this._weatherData = _data.hourly_forecast;break;
            case "生活指数": this._weatherData = _data.suggestion;break;
            case "灾害预警": this._weatherData = _data.alarms;break;
        }
    }

    _failCallBack(error){
        console.log(error);
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