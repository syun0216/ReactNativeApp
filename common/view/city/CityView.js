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
    ScrollView,
    Image
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import BaseStyles from "../../styles/BaseStyles";
import HttpServices from "../../http/HttpServices";
import CityData from "../../http/CityData";
import WeatherView from "../weather/WeatherView";

export default class MovieView extends Component{

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
                    return (
                        <TouchableOpacity style={BaseStyles.viewContainer} key={`${idx}`}
                                          onPress={() => this._goToWeatherPage(value.cityName)}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{flex:1,marginLeft:10}}>{value.cityName}</Text>
                                <Image style={{width: 20, height: 20, marginLeft: 5}}
                                       source={{uri: 'more'}}/>
                            </View>

                        </TouchableOpacity>
                    )
                })
            }

        })
    }

    _goToWeatherPage(val){
        this.props.navigator.push({
            name:"WeatherView",
            component:WeatherView,
            params:{
                cityName:val
            }
        })
    }
}
