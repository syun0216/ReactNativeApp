/**
 * Created by Syun on 2017/2/3.
 * 底部提示工具
 */
import ToastUtils from 'react-native-root-toast'

var Toast = {

    showWithMessage(message) {
        ToastUtils.show(message, {duration: ToastUtils.durations.SHORT,position:ToastUtils.positions.BOTTOM});
    },

};

module.exports = Toast;
