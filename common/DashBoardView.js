/**
 * Created by Syun on 2017/1/23.
 * 首页
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image

} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Colors from './utils/Colors';
import BaseStyles from './styles/BaseStyles';
import HomeView from './view/home/HomeView';
import MyView from './view/my/MyView';

const _TAB_HOME = "主页";
const _TAB_MY = "我的";

export default class DashBoardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: _TAB_HOME,

        }
    }

    render() {
        return (
            <View style={BaseStyles.BaseContainer}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab == _TAB_HOME}
                        title={_TAB_HOME}
                        titleStyle={{color:Colors.DEEP_GRAY}}
                        selectedTitleStyle={{color:Colors.RED}}
                        renderIcon={() => this.renderTabIcon(_TAB_HOME)}
                        renderSelectedIcon = {() => this.renderTabSelectedIcon(_TAB_HOME)}
                        onPress={() => this._onPressTab(_TAB_HOME)} >
                        <HomeView {...this.props} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab == _TAB_MY}
                        title={_TAB_MY}
                        titleStyle={{color:Colors.DEEP_GRAY}}
                        selectedTitleStyle={{color:Colors.RED}}
                        renderIcon={() => this.renderTabIcon(_TAB_MY)}
                        renderSelectedIcon = {() => this.renderTabSelectedIcon(_TAB_MY)}
                        onPress={() => this._onPressTab(_TAB_MY)} >
                        <MyView {...this.props} />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }

    _onPressTab(tabType){
        if(tabType == this.state.selectedTab){
            return;
        }
        this.setState({selectedTab:tabType});
    }



    renderTabIcon(tabName) {
        let source = null;
        switch (tabName) {
            case _TAB_HOME:
                source = {uri: 'right'};
                break;
            case _TAB_MY:
                source = {uri: 'me_dis'};
                break;
            default:
                break;
                return (
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={source}/>
                );
        }
    }

    renderTabSelectedIcon(tabName) {
        let source = null;
        switch (tabName) {
            case _TAB_HOME:
                source = {uri: 'home'};
                break;
            case _TAB_MY:
                source = {uri: 'me'};
                break;
            default:
                break;
        }
        return (
            <Image
                style={styles.image}
                resizeMode="contain"
                source={source}/>
        );
    }
}

const styles = StyleSheet.create({
   image:{
       width:24,
       height:24
   }
});