;define(function(){
	'use strict';
    //请确保modules第一个被赋值
    var modules = {},
		//请确保srcRoot第二个被赋值
		//srcRoot = 'src/',
		srcRoot = '',
		//请确保productRoot第三个被赋值
		//productRoot = 'dist/',
		productRoot = '',
		//请确保siteVersion第四个被赋值
		siteVersion = "1",
		//请确保debug第五个被赋值
		debug = true,
		prefix = '/',
		cfg = {
			baseUrl: prefix + srcRoot
		};
		if (!debug) {
			for (var n in modules) {
				modules[n] = prefix + productRoot + n + '/' + modules[n];
			}
			cfg.paths = modules;
		}
		require.config(cfg);
	//用于外部访问的基本信息
	require.data = {
		siteVersion: siteVersion,
		debug: debug
	};
	//若需要从外部获得模块路径请使用require.toUrl('family/name')

	{
		var config = {};
		var packages = [];
		if(require.data.debug){
			packages.push({
				name : "less",
				location : "/external/require",
				main : "less"
			});
		}else{
			packages.push({
				name : "css",
				location : "/external/require",
				main : "css"
			});
		}

		var map = {
	        // "*": {
	        //     "less": "/external/require/less"
	        // }
	    };

	    config.packages = packages;

	    // 如果是debug , 就去掉缓存
	    require.data.debug ? config.urlArgs = "v=" + (new Date()).getTime() : "";

	    require.config(config);
	}
});