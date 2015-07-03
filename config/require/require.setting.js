;(function(){
    'use strict';
    var paths = {
        "loli" : "/external/root/loli",
        "avalon" : "/external/avalon/avalon.shim",
        "av" : "/external/root/loli.avalon",
        "mmHistory" : "/external/avalon/mmHistory",
        "mmRouter" : "/external/avalon/mmRouter",
        "mmPromise" : "/external/avalon/mmPromise",
        "mmState" : "/external/avalon/mmState",
        "rConfig" : "/config/router/router.config"
    };
    var ddeps = ["/external/require/require.config.js?v="+new Date().valueOf()];

    var plugins = {
        "$": "/plugins/jquery/jquery"
    };
    var plugindeps = ["$"];

    // 合并参数
    var key;
    for(key in plugins){
        paths[key] = plugins[key];
    }
    var deps = ddeps.concat(plugindeps);


    window.require = {
        paths : paths,
        deps : deps
    };
})();