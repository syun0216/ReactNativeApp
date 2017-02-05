/**
 * Created by Syun on 2017/2/4.
 * 获取网络请求js
 */


let HttpServices = {
    get(url,successCallBack,failCallBack){
        "use strict";
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallBack(responseJson);
            })
            .catch((error) => {
                failCallBack(error);
            })

    },
    post(url,data,successCallBack,failCallBack){
        "use strict";
        fetch(url,{
            method:'POST',
            headers :{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                successCallBack(responseJson)
            })
            .catch((error) => {
                failCallBack(error);
            })
    }

};

module.exports = HttpServices;
