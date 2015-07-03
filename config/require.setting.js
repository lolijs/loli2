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
        "rConfig" : "/src/common/router/router.config",
        "require.custom" : "/external/require/require.custom"
    };
    window.require = {
        paths:paths,
        deps : [
            "/external/require/require.config.js?v="+new Date().valueOf(),
            "require.custom"
        ]
    };
})();