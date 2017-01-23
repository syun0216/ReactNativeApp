/**
 * Created by junwen on 2016/8/31.
 * 字体大小组件
 */
/**
 * 字体大小
 */
'use strict';
import {
    Platform,
} from 'react-native'

var TextSizes = {

    SIZE_20: Platform.OS == 'ios' ? 22: 20,

    SIZE_18: Platform.OS == 'ios' ? 20: 18,

    SIZE_16: Platform.OS == 'ios' ? 18 : 16,

    SIZE_14: Platform.OS == 'ios' ? 16 : 14,

    SIZE_12: Platform.OS == 'ios' ? 14 : 12,

    SIZE_10: Platform.OS == 'ios' ? 12 : 10,

    //TODO 不完美
    getLengthOfTextWithFontSize(fontSize, text) {
        if (text == null) {
            return 0;
        }

        return text.toString().length * (fontSize - 3);
    }
};

module.exports = TextSizes;