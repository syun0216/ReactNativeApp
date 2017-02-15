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
    _data = null;
    _initData() {
        this._data = {
            _weatherData: null,
            _nowData: null,
            _hourData: null,
            _suggestionData: null,
            _alarmData: null
        };
    }
    constructor(props) {
        super(props);
        this._initData();
        this.state = {
            currentSelectedService: "天气预报",
            isLoading: true,
            refreshing:false
        }
    }

    componentDidMount() {
        HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_FORECAST + this.props.cityName,
            (res) => {
                this._weatherData = res.HeWeather5[0].daily_forecast;
                this.setState({
                    isLoading: false
                });
            }, (error) => {
                this.setState({
                    isLoading: false
                });
                Toast.showWithMessage("发生未知错误!");
            })
    }

    componentWillUnmount() {

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
                       this._renderContentView()
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
        switch (this.state.currentSelectedService) {
            case "天气预报":
                return this._data._weatherData != null ? this._data._weatherData.map((value, idx) => {
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
                }) : null;
                break;
                //点击实况天气,会一直发出请求
            case "实况天气" :
                return (
                this._data._nowData != null ?
                    <View>
                        <Text>天气状况:</Text>
                        {this._renderWeatherIconView(this._data._nowData.cond.code)}
                        <Text>{this._data._nowData.cond.txt}</Text>
                        <Text>体感温度:</Text>
                        <Text>{this._data._nowData.fl}</Text>
                        <Text>相对湿度:</Text>
                        <Text>{this._data._nowData.hum}%</Text>
                        <Text>降水量:</Text>
                        <Text>{this._data._nowData.pcpn}</Text>
                        <Text>气压:</Text>
                        <Text>{this._data._nowData.pres}</Text>
                        <Text>温度:</Text>
                        <Text>{this._data._nowData.tmp}</Text>
                        <Text>能见度</Text>
                        <Text>{this._data._nowData.vis}</Text>
                        <Text>风力方向:</Text>
                        <Text>风向(360度):{this._data._nowData.wind.deg}</Text>
                        <Text>风向{this._data._nowData.wind.dir}</Text>
                        <Text>风力:{this._data._nowData.wind.sc}</Text>
                        <Text>风速:{this._data._nowData.wind.spd}</Text>
                    </View> : null
                );break;
            case "每小时预报":
                return (
                  this._data._hourData != null ?
                      <View>
                        <Text>天气状况:</Text>
                          {this._renderWeatherIconView(this._data._hourData.cond.code)}
                          <Text>{this._data._hourData.cond.txt}</Text>
                          <Text>当前时间:</Text>
                          <Text>{this._data._hourData.date}</Text>
                          <Text>相对湿度:(%)</Text>
                          <Text>{this._data._hourData.hum}</Text>
                          <Text>降水概率:</Text>
                          <Text>{this._data._hourData.pop}</Text>
                          <Text>气压:</Text>
                          <Text>{this._data._hourData.pres}</Text>
                          <Text>温度:</Text>
                          <Text>{this._data._hourData.tmp}°C</Text>
                          <Text>风力风向:</Text>
                          <Text>风向:(360度)</Text>
                          <Text>{this._data._hourData.wind.deg}</Text>
                          <Text>风向:</Text>
                          <Text>{this._data._hourData.wind.dir}</Text>
                          <Text>风力:</Text>
                          <Text>{this._data._hourData.wind.sr}</Text>
                          <Text>风速:</Text>
                          <Text>{this._data._hourData.wind.spd}</Text>
                      </View> : null
                );
            case "生活指数":
                return (
                    this._data._suggestionData != null ?
                        <View>
                            <Text>舒适度指数:</Text>
                            <Text>{this._data._suggestionData.comf.brf}</Text>
                            <Text>{this._data._suggestionData.comf.txt}</Text>
                            <Text>洗车指数:</Text>
                            <Text>{this._data._suggestionData.cw.brf}</Text>
                            <Text>{this._data._suggestionData.cw.txt}</Text>
                            <Text>穿衣指数:</Text>
                            <Text>{this._data._suggestionData.drsg.brf}</Text>
                            <Text>{this._data._suggestionData.drsg.txt}</Text>
                            <Text>感冒指数:</Text>
                            <Text>{this._data._suggestionData.flu.brf}</Text>
                            <Text>{this._data._suggestionData.flu.txt}</Text>
                            <Text>运动指数:</Text>
                            <Text>{this._data._suggestionData.sport.brf}</Text>
                            <Text>{this._data._suggestionData.sport.txt}</Text>
                            <Text>紫外线指数:</Text>
                            <Text>{this._data._suggestionData.uv.brf}</Text>
                            <Text>{this._data._suggestionData.uv.txt}</Text>
                        </View> : null
                );
            case "灾害预警":
                return (
                    this._data._alarmData != null ?
                        <View>
                            <Text>预警等级:</Text>
                            <Text>{this._data._alarmData.level}</Text>
                            <Text>预警状态:</Text>
                            <Text>{this._data._alarmData.stat}</Text>
                            <Text>预警信息标题:</Text>
                            <Text>{this._data._alarmData.title}</Text>
                            <Text>预警信息详情:</Text>
                            <Text>{this._data._alarmData.txt}</Text>
                            <Text>预警天气类型:</Text>
                            <Text>{this._data._alarmData.type}</Text>
                        </View> : null
                )
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
        this._initData();
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
                    this._data._weatherData = res.HeWeather5[0].daily_forecast;
                    this.setState({
                       isLoading:false
                    });
                }, (error) => this._failCallBack(error));
                break;
            case "实况天气":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_NOW + this.props.cityName, (res) =>
                {
                    this._data._nowData = res.HeWeather5[0].now;
                    this.setState({
                        isLoading:false
                    })
                }, (error) => this._failCallBack(error));
                break;
            case "每小时预报":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_HOURLY + this.props.cityName, (res) =>
                {
                    this._data._hourData = res.HeWeather5[0].hourly_forecast;
                    this.setState({
                       isLoading:false
                    });
                }, (error) => this._failCallBack(error));
                break;
            case "生活指数":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_SUGGESTION + this.props.cityName, (res) =>
                {
                    this._data._suggestionData = res.HeWeather5[0].suggestion;
                    this.setState({
                        isLoading:false
                    });
                }, (error) => this._failCallBack(error));
                break;
            case "灾害预警":
                HttpServices.get(HttpRequestUrls.GET_CITY_WEATHER_ALARM + this.props.cityName, (res) =>
                {
                    this._data._alarmData = res.HeWeather5[0].alarms;
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