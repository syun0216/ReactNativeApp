/**
 * Created by junwen on 2016/8/31.
 * 设备信息
 */
'use strict';

import React,{Component} from "react";
import {
    Dimensions,
    Platform,
    NativeModules
} from "react-native";

var DeviesUtils = {

    SCREEN_WIDTH:Dimensions.get('window').width,
    SCREEN_HEIGHT:Dimensions.get('window').height,

};