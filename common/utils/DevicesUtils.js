/**
 * Created by Syun on 2017/2/6.
 * 设备信息
 */
'use strict';

import React, {
    Dimensions,
    Platform,
    NativeModules,
} from 'react-native';

let DevicesUtils = {

    SCREEN_WIDTH:Dimensions.get('window').width,

    SCREEN_HEIGHT: Dimensions.get("window").height,

    getScreenHeight() {
        if (Platform.OS == 'ios') {
            return Dimensions.get("window").height;
        } else {
            const ExtraDimensions = require("./AndroidExtraDimensions")
            return ExtraDimensions.REAL_WINDOW_HEIGHT - ExtraDimensions.STATUS_BAR_HEIGHT
                - ExtraDimensions.SOFT_MENU_BAR_HEIGHT;
        }
    }
};

module.exports = DevicesUtils;