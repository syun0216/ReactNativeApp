/**
 * Created by Syun on 2017/1/23.
 * 基础样式库
 */

import React,{Component} from 'react';
import {
    StyleSheet
} from 'react-native';
import Colors from '../utils/Colors';

const BaseStyles = StyleSheet.create({
    BaseContainer:{
        flex:1,
        backgroundColor: Colors.BACKGROUND,
    },
    loginContainer:{
        flex:1,
        backgroundColor: Colors.BACKGROUND,
    }
});

module.exports = BaseStyles;