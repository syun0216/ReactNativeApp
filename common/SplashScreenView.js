/**
 * Created by Syun on 2017/1/23.
 */
import React, {
    Component
} from 'react';

import {
    View,
    Navigator,
    Platform,
    Alert
} from 'react-native';
import DashBoardView from './DashBoardView';

export default class SplashScreenView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Navigator
                initialRoute={{name:"DashBoardView",component:DashBoardView}}
                configureScene={() => ({
                    ...Navigator.SceneConfigs.PushFromRight,
                    gestures:{}
                })}
                renderScene={(route,navigator) => {
                    if(route != null && route.component != null){
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }
                    else{
                        return <DashBoardView navigator={navigator}/>
                    }
                }}
            />
        )
    }
}