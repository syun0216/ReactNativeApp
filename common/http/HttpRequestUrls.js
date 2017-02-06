/**
 * Created by Syun on 2017/1/24.
 * 网络请求的url
 */

const _serverAddress = 'https://api.wang-guanjia.com';
const _weatherAddress = 'https://free-api.heweather.com/v5/';
const _key = "b9ddb41f102a41ee95cceb5d93082199";

let HttpRequestUrls = {

    GET_SMS_CODE : _serverAddress+ "/phoneCode/getsmscode.api",

    LOGIN_BY_PASSWORD : _serverAddress+ "/users/login.api",

    GET_CITY_WEATHER_FORECAST : _weatherAddress+ `/forecast?key=${_key}&city=`,

    GET_CITY_WEATHER_NOW: _weatherAddress+ `/now?key=${_key}&city=`,

    GET_CITY_WEATHER_HOURLY: _weatherAddress+ `/hourly?key=${_key}&city=`,

    GET_CITY_WEATHER_SUGGESTION: _weatherAddress+ `/suggestion?key=${_key}&city=`,

    GET_CITY_WEATHER_ALARM: _weatherAddress + `/alarm?key=${_key}&city=`,

    GET_CITY_WEATHER_ALL: _weatherAddress + `/weather?key=${_key}&city=`,



};

module.exports = HttpRequestUrls;
