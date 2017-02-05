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
import BookView from './view/book/BookView';
import MovieView from './view/movie/MovieView';
import MusicView from './view/music/MusicView';
import MyView from './view/my/MyView';

const _TAB_BOOKS = "book";
const _TAB_MOVIES = "movie";
const _TAB_MUSIC = "music";
const _TAB_MINE = "my";

export default class DashBoardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: _TAB_BOOKS,

        }
    }

    render() {
        return (
            <View style={BaseStyles.BaseContainer}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab == _TAB_BOOKS}
                        title={_TAB_BOOKS}
                        titleStyle={{color:Colors.DEEP_GRAY}}
                        selectedTitleStyle={{color:Colors.RED}}
                        renderIcon={() => this.renderTabIcon(_TAB_BOOKS)}
                        renderSelectedIcon = {() => this.renderTabSelectedIcon(_TAB_BOOKS)}
                        onPress={() => this._onPressTab(_TAB_BOOKS)} >
                        <BookView {...this.props} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab == _TAB_MINE}
                        title={_TAB_MINE}
                        titleStyle={{color:Colors.DEEP_GRAY}}
                        selectedTitleStyle={{color:Colors.RED}}
                        renderIcon={() => this.renderTabIcon(_TAB_MINE)}
                        renderSelectedIcon = {() => this.renderTabSelectedIcon(_TAB_MINE)}
                        onPress={() => this._onPressTab(_TAB_MINE)} >
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
            case _TAB_BOOKS:
                source = {uri: 'book'};
                break;
            case _TAB_MOVIES:
                source = {uri: 'movie'};
                break;
            case _TAB_MUSIC:
                source = {uri: 'music'};
                break;
            case _TAB_MINE:
                source = {uri: 'mine'};
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

    renderTabSelectedIcon(tabName) {
        let source = null;
        switch (tabName) {
            case _TAB_BOOKS:
                source = {uri: 'book'};
                break;
            case _TAB_MOVIES:
                source = {uri: 'movie'};
                break;
            case _TAB_MUSIC:
                source = {uri: 'music'};
                break;
            case _TAB_MINE:
                source = {uri: 'mine'};
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