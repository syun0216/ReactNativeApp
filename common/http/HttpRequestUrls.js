/**
 * Created by Syun on 2017/1/24.
 * 网络请求的url
 */

const _serverAddress = 'https://api.wang-guanjia.com';
const _doubanAddress = "https://api.douban.com/v2/";

var HttpRequestUrls = {

    GET_SMS_CODE : _serverAddress+ "/phoneCode/getsmscode.api",

    LOGIN_BY_PASSWORD : _serverAddress+ "/users/login.api",

    BOOK_SEARCH : _doubanAddress + "/book/search",

    BOOK_SEARCH_ID : _doubanAddress + "/book/",

    MUSIC_SEARCH : _doubanAddress + "/music/search",

    MUSIC_SEARCH_ID : _doubanAddress + "/music",

    MOVIE_SEARCH : _doubanAddress + "/movie/search",

    MOVIE_SEARCH_ID : _doubanAddress + "/movie/subject"

};
