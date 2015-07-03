;define(function(){
    'use strict';

    // 系统需要的router
    var routerList = [
        "main", // 主框架
        "index", // 首页
        "user" // 用户中心
        //"footer"
    ];

    var i,resList=[],baseurl="common/router/";

    for(i in routerList){
        resList.push(baseurl+routerList[i]);
    }
    return resList;
});