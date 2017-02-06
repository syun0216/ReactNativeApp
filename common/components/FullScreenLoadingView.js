/**
 * Created by Syun on 2017/2/6.
 */

'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicatorIOS,
    Dimensions,
    Platform,
    ActivityIndicator
} from 'react-native';
import Colors from '../utils/Colors';
import * as DevicesUtils from "../utils/DevicesUtils";
let  screenWidth = DevicesUtils.SCREEN_WIDTH;
let  screenHeight = DevicesUtils.getScreenHeight();

export default class FullScreenLoadingView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {httpRequestTips: this.props.message};
    }

    render() {
        let message = this.state.httpRequestTips == null ? '' : this.state.httpRequestTips;

        return (
            <View style={styles.fullscreencontainer}>
                <ActivityIndicator size="large"/>
                <Text style={{color:'white', marginTop:10}}>{message}</Text>
            </View>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.httpRequestTips != nextProps.message) {
            this.setState({httpRequestTips: nextProps.message})
        }
    }
}


const styles = StyleSheet.create({

    fullscreencontainer: {
        flex: 1,
        position: 'absolute',
        top: -50,
        left: 0,
        width: screenWidth,
        height: screenHeight + 100,
        backgroundColor: Colors.TRANSLUCENT,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
