;define(function(){
    "use strict";
    var loli = {};
    loli.debug = require.data.debug;
    loli.style = loli.debug ? "less" : "css";

    var unit = loli.unit = {};
    unit.hashToUrl = function(hash){
    	hash = hash || location.hash;
    	var flag = ["#!/","#/"],i,f,fl,hl;
    	for(i in flag){
    		f = flag[i];
    		fl = f.length;
    		hl = hash.length;
    		if(hl > fl && hash.indexOf(f) == 0){
    			return require.toUrl(hash.substr(fl,hl));
    		}
    	}
    };

    unit.style = function(url,key){
        return this.localUrl(loli.style + "!" +url,key)
    };
    unit.js = function(url,key){
        return this.localUrl(url,key);
    };
    unit.html = function(url,key){
        return require.toUrl(this.localUrl(url+".html",key));
    };
    unit.json = function(url,key){
        return require.toUrl(this.localUrl(url+".json",key));
    };
    unit.url = function(url,key){
        return require.toUrl(this.localUrl(url,key));
    };
    unit.localUrl = function(url,id){
        if(id){
            var urlArr = id.split(".");
            urlArr.pop();
            return urlArr.join("/")+"/"+url;
        }else{
            return url;
        }
    };

    // 参数字符串转对象
    unit.getUrlParam = function(){
        var search = location.search;
        var sStr,sArr,i,j,sArrStr,sArrStrArr,sKey,sVal,sData={};
        var sl = search.length;
        if(sl>1){
            if(search.indexOf("?") == 0){
                sStr = search.substr(1,sl);
                sArr = sStr.split("&");
                j = sArr.length;
                for(i=0;i<j;i++){
                    sArrStr = sArr[i];
                    sArrStrArr = sArrStr.split("=");

                    sKey = sArrStrArr[0];
                    sVal = sArrStrArr[1];
                    sData[sKey] = sVal;
                }
                return sData;
            }

        }else{
            return "";
        }
    }

    // 参数对象转字符串
    unit.serialize = function(data){
        if(!data || typeof data != "object") return ;

        // 重置一下
        var paramStr="",key,value;
        // 格式化一下
        for(key in data){
            value = data[key];

            // 如果key 存在
            if(paramStr){
                paramStr += "&" + key + "=" + value;
            }else{
                // 如果有值 就传
                paramStr = key + "=" + value;   
            }
            
        }
        return encodeURI(paramStr);
    }


    window["loli"] = loli;
    return loli;
});