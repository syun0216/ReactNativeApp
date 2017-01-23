/**
 * Created by junwen on 2016/8/30.
 * 标题栏
 */
"use strict";
import React,{Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    Image,
    TouchableOpacity,
    Animated
} from "react-native";
import Colors from '../utils/Colors';
import TextSizes from "../utils/TextSizes";
import DevicesUtils from "./DevicesUtils";

export default class TitleBar extends Component{
    static propTypes = {
        title: React.PropTypes.string,
        canBack: React.PropTypes.bool,
        rightText: React.PropTypes.string,
        rightImageUrl: React.PropTypes.string,
        onRightButtonPress: React.PropTypes.func,
        onBackPress:React.PropTypes.func,
        titleOpacity:React.PropTypes.object
    };

    // 构造
      constructor(props,context) {
        super(props,context);
        // 初始状态
          let opacity = this.props.titleOpacity == null ? 1 : this.props.titleOpacity;
        this.state = {title:props.title,backVisible:props.canBack,opacity:opacity};
      }

    render(){
        return (
            <Animated.View style={[styles.container
            ,{opacity:this.state.opacity}]}>
                {
                    Platform.OS == 'ios' ? <View style={{height:20}}/> : null
                }
                <View style={styles.contentcontainer}>
                    <TouchableOpacity onPress={() => this._onPressBackButton()}>
                        <View style={styles.leftViewContainer}>
                            {
                                this.state.backVisible ?
                                    <Image style={{width:24,height:24}} source={{uri:"back"}}/> : null
                            }
                        </View>
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titletext} numberOfLines={1}>{this.state.title}</Text>
                    </View>
                    <TouchableOpacity onPress={this.props.onRightButtonPress}>
                        <View style={styles.rightViewContainer}>
                            <Text style={{fontSize: TextSizes.SIZE_14, color: Colors.WHITE}}>{this.props.rightText}</Text>
                            {
                                this.props.rightImageUrl != null
                                ? <Image style={{width:20,height:20}} resizeMode='contain' source={{uri:this.props.rightImageUrl}}/> : null
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }

    _onPressBackButton(){
        if(this.props.onBackPress != null){
            this.props.onBackPress();
            return;
        }
        if(this.props.navigator != null){
            this.props.navigator.pop();
        }
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        width: DevicesUtils.SCREEN_WIDTH,
    },

    contentcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },

    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    titletext: {
        color:Colors.DEEP_GRAY,
        fontSize: TextSizes.SIZE_18,
    },

    leftViewContainer: {
        width: 70,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
    },

    rightViewContainer: {
        flexDirection: 'row',
        width: 70,
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 15,
    },
});