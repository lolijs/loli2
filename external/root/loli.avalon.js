;define(["loli","mmState"],function(loli,av){
    "use strict";

    var av = avalon;
    var successedFlag = "res";
    // 配置
    {
       avalon.config({loader: false});
    }

    // 定义
    {
        loli.avalon = {};
        avalon.mix(loli.avalon,av,loli.unit);
    }

    // 业务相关
    {
        // var logic = {
        //     session : {
        //         sessionId : "ticket",
        //         get : function(){
        //             var sId = logic.session.sessionId;
        //             var dd = {};
        //             var ck = $.cookie(sId);
        //             if(ck){
        //                 dd[sId] = ck;
        //                 return dd;
        //             }else{
        //                 return null;
        //             }
        //         }
        //     }
        // };
    }

    // Model 工厂
    var MFactory = function(param){

        var self = this,
            setting = {
                data : {},
                view : {},
                events : {},
                get : self.get,
                post : self.post
            },key;
            
        // 支持更多属性
        $.extend(setting,param);
        // 设置setting
        setting.$setting = param.setting;

        for(key in setting){
            self[key] = setting[key];
        }
    };
    MFactory.prototype = {
        constructor : MFactory,
        init : function(vm,_param){
            this.vm = vm;
            // 如果设置了 setting 就获取数据
            if(vm.$setting){
                if(_param && _param.setting){

                    this.get(vm,_param.setting);
                }else{

                    this.get(vm);
                }
            }
        },
        get : function(_vm,_param){
            var vm = _vm || this.vm;
            var param = vm.$setting;//.$model;
            // 如果有自定义参数; 就合并
            if(_param){
                $.extend(param,_param);
            }
            
            var setting = {
                //type : "get",
                dataType : "json"
            };

            // 合并逻辑相关数据
            // {
            //     var _dd = logic.session.get();
            //     var _i;
            //     if(_dd){
            //         if(!param.data)param.data={};
            //         for(_i in _dd){
            //             param.data[_i] = _dd[_i];
            //         } 
            //     }
            // }

            setting = avalon.mix(setting,param);

            setting.success = function(json){
                var dd,key,obj,$model;
                // if(json && json.res == 1){
                // 根据API调整
                if(json && json[successedFlag] == true){
                    // 替换model, 必须从新赋值model, 否则无法触发监听
                    // 重置 data
                    if($.type(json.data)=="array"){
                        vm.data.$model = [];
                    }else{
                        vm.data.$model = null;
                    }
                    
                    vm.data = json.data;
                    
                    // 回调
                    if(param.success && typeof param.success == "function"){
                        param.success(json.data);
                    }
                }else{
                    // 回调
                    if(param.error && typeof param.error == "function"){
                        param.error(json);
                    }
                }
            }
            
            if(setting.ajax){
                return setting.ajax(setting);
            }else{
                return $.ajax(setting);
            }
        },
        post : function(param){
            var setting = param||this.$setting;//.$model;
            var _data = this.data.$model;
            // 合并逻辑相关数据
            // {
            //     var _dd = logic.session.get();
            //     var _i;
            //     if(_dd){
            //         if(!_data)_data={};
            //         for(_i in _dd){
            //             _data[_i] = _dd[_i];
            //         } 
            //     }
            // }

            var data = JSON.stringify(_data);

            // 如果使用了serialize 就 执行
            if(param.serialize && typeof param.serialize == "function"){
                data = param.serialize(this.data.$model);
            }


            console.log("this",this,data);
            var _setting = {
                type : "post",
                data : data
            },key;
            for(key in setting){
                _setting[key] = setting[key];
            }
            // 设置 success 方法
            _setting.success = function(json){
                var dd,key,obj,$model;
                // if(json && json.res == 1){
                // 根据API调整
                if(json && json[successedFlag] == true){
                    // 回调
                    if(param.success && typeof param.success == "function"){
                        param.success(json);
                    }
                }else{
                    // 回调
                    if(param.error && typeof param.error == "function"){
                        param.error(json);
                    }
                }
            }
            console.log("setting",_setting);
            if(setting.ajax){
                return setting.ajax(setting);
            }else{
                return $.ajax(setting);
            }
        }
    };

    // VM工厂
    var VMFactory = function(param){
        var self = this,
            setting = {
                view : {},
                events : {},
            },key;
            
        // 支持更多属性
        $.extend(setting,param);

        for(key in setting){
            self[key] = setting[key];
        }
    };
    VMFactory.prototype = {
        constructor : VMFactory,
        init : function(){}
    };
    
    // define 工厂
    loli.avalon.define = function(flag,param){
        var setting = {},_id,_el;

        // 是否已经初始化过
        // 如果初始化过， 就执行渲染
        var isRender = function(param){
            // 是否有ID， 如果没有， 就跳过
            if(!param || !param.$id){
                return false;
            }else{
                var _id = param.$id;
                // 判断是否在vmodels中存在
                if(avalon.vmodels[_id]){
                    var _vm = avalon.vmodels[_id];
                    _vm.init(_vm,param);
                    return _vm;
                }
            }
            return true;
        }

        if(typeof flag == "object"){
            param = flag;
            var _isRender = isRender(param);
            if(_isRender!=true)return _isRender;
            setting = new VMFactory(param);
            console.log("v",setting);
        }else if(flag == "Model"){
            var _isRender = isRender(param);
            if(_isRender!=true)return _isRender;
            setting = new MFactory(param);
        }

        // 设置 el
        {
            _id = setting.$id;
            setting.$el = "";
            _el = $("[ms-controller='"+_id+"']");
            if(_el && _el.length > 0){
                setting.$el = _el;
            }
        }

        {
            setting.scan = function(elem,vmodel){
                var self = this,_self;
                console.log("setting.$el",setting.$el);
                if(setting.$el){
                    setting.$el.each(function(){
                        av.scan(this,self);
                    });
                }
            }
        }

        var vm = av.define(setting);
        // 加载 model 的数据
        //model.create(vm,param.model);
        if(flag == "Model"){
            setting.init(vm);
        }
        return vm;
    };

    return loli.avalon;
});

/**
 * 用法
 */
/**
var mv = av.define("Model",{
  $id : "index",
  setting : {
    url : av.url("/mobile-api/index.html"),
    success : function(dd){

    }
  },
  view : {
    test : ""
  }
});
**/