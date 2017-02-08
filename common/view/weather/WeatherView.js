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
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";
import HttpServices from "../../http/HttpServices";
import HttpRequestUrls from "../../http/HttpRequestUrls";
import Colors from "../../utils/Colors";
import FullScreenLoadingView from '../../components/FullScreenLoadingView';
import WeatherIconData from "../../utils/WeatherIconData";
import Toast from "../../utils/Toast";

export default class WeatherView extends Component {
    _weatherData = null;

    constructor(props) {
        super(props);
        this.state = {
            currentSelectedService: "天气预报",
            isLoading: true,
            refreshing:false
        }
    }

    componentWillMount() {
        HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_FORECAST + this.props.cityName,
            (res) => {
                this._weatherData = res.HeWeather5[0].daily_forecast;
                this.setState({
                    isLoading: false
                });
                console.log(this._weatherData);
            }, (error) => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
                Toast.showWithMessage("发生未知错误!");
            })
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

    _renderLoadingView() {
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
                <ScrollView style={Styles.contentContainer}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._getWeatherData(this.state.currentSelectedService)}
                                />
                            }>
                    {
                        this._weatherData != null ? this._renderContentView() : null
                    }
                </ScrollView>
            </View>
        )
    }

    _renderListView() {
        let listData = ["天气预报", "实况天气", "每小时预报", "生活指数", "灾害预警"];
        return listData.map((value, idx) => {
            return (
                <TouchableOpacity key={`${idx}`} style={[Styles.listItemContainer,
                    this.state.currentSelectedService == value ? Styles.listItemActive : null]}
                                  onPress={() => this._selectService(value)}>
                    <View>
                        <Text style={this.state.currentSelectedService == value ? {color: Colors.RED} : null}>
                            {value}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    _renderContentView() {
        let _value = this._weatherData;
        if (_value == null) {
            return;
        }
        switch (this.state.currentSelectedService) {
            case "天气预报":
                return _value.map((value, idx) => {
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
                                <Text>白天天气:</Text>
                                {this._renderWeatherIconView(value.cond.code_d)}
                                <Text>{value.cond.txt_d}</Text>
                                <Text>夜间天气:</Text>
                                {this._renderWeatherIconView(value.cond.code_n)}
                                <Text>{value.cond.txt_n}</Text>
                            </View>
                        </View>
                    )
                });
                break;
                //点击实况天气,会一直发出请求
            case "实况天气" :
                return (
                    <View>
                        <Text>天气状况:</Text>
                        {this._renderWeatherIconView(_value.cond.code)}
                        <Text>{_value.cond.txt}</Text>
                        <Text>体感温度:</Text>
                        <Text>{_value.fl}</Text>
                        <Text>相对湿度:</Text>
                        <Text>{_value.hum}%</Text>
                        <Text>降水量:</Text>
                        <Text>{_value.pcpn}</Text>
                        <Text>气压:</Text>
                        <Text>{_value.pres}</Text>
                        <Text>温度:</Text>
                        <Text>{_value.tmp}</Text>
                        <Text>能见度</Text>
                        <Text>{_value.vis}</Text>
                        <Text>风力方向:</Text>
                        <Text>风向(360度):{_value.wind.deg}</Text>
                        <Text>风向{_value.wind.dir}</Text>
                        <Text>风力:{_value.wind.sc}</Text>
                        <Text>风速:{_value.wind.spd}</Text>
                    </View>
                );break;
            case "每小时预报":
                return null;
            case "生活指数":
                return null;
            case "灾害预警":
                return null;
        }
    }

    _renderWeatherIconView(code) {
        return WeatherIconData.weatherData.map((value, idx) => {
            if (value.code == code) {
                return (
                    <Image key={`${idx}`} style={{width: 40, height: 40}} source={{uri: value.url}}/>
                )
            }
        })

    }


    _selectService(value) {
        if (value == this.state.currentSelectedService) {
            return
        }
        this.setState({
            currentSelectedService: value,
            isLoading:true
        });
        this._getWeatherData(value);
    }

    _getWeatherData(value) {
        switch (value) {
            case "天气预报":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_FORECAST + this.props.cityName, (res) =>
                {
                    this._weatherData = res.HeWeather5[0].daily_forecast;
                    this.setState({
                       isLoading:false
                    });
                }, (error) => this._failCallBack(error));
                break;
            case "实况天气":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_NOW + this.props.cityName, (res) =>
                {
                    this._weatherData = res.HeWeather5[0].now;
                    this.setState({
                        isLoading:false
                    })
                }, (error) => this._failCallBack(error));
                break;
            case "每小时预报":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_HOURLY + this.props.cityName, (res) =>
                {
                    this._weatherData = res.HeWeather5[0].hourly_forecast;
                    this.setState({
                       isLoading:false
                    });
                }, (error) => this._failCallBack(error));
                break;
            case "生活指数":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_SUGGESTION + this.props.cityName, (res) =>
                {
                    this._weatherData = res.HeWeather5[0].suggestion;
                    this.setState({
                        isLoading:false
                    });
                }, (error) => this._failCallBack(error));
                break;
            case "灾害预警":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_ALARM + this.props.cityName, (res) =>
                {
                    this._weatherData = res.HeWeather5[0].alarms;
                    this.setState({
                        isLoading:false
                    });
                }, (error) => this._failCallBack(error));
                break;
        }
    }

    _failCallBack(error) {
        console.log(error);
    }

}

const Styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: Colors.MIDDLE_GRAY
    },
    listContainer: {
        width: 100,
        backgroundColor: Colors.WHITE,
        borderRightWidth: 1,
        borderRightColor: Colors.MIDDLE_GRAY,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    listItemContainer: {
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.MIDDLE_GRAY,
    },
    listItemActive: {
        borderLeftWidth: 5,
        borderLeftColor: Colors.RED,
    }

});