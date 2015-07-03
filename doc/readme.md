#标准写法

<!-- HTML部分 -->
<ul ms-controller="路径.文件名" >
    <li>
        {{view.title}}
    </li>
</ul>

<!-- JS部分 -->
<script type="text/javascript">
;require(["av"],function(av){
    "use strict";
    var vm = av.define({
        $id : "路径.文件名",
        view : {
            title : "Hello"
        },
        event : {},
        model : {}
    });
    // 扫描自己
    vm.scan();
});
</script>

# 构建思路
1. mvvm 渲染页面
2. 封装 define 方法; 只留出固定接口
	现有接口: $id, view, event, model
	$id : 按照 目录结构 取名, 
	view : 跟视图相关数据
	event : 事件
	model : 数据模型 , 需要后台交互的数据
3. 封装model层, 让数据自动提交

# 开发规则
1. 构建API;
2. 给出模拟数据;
3. 前端(界面,IOS,Android)拿模拟数据开发;
4. 后端依照API开发;

# Json 数据规范
{
    "res" : 1, // 0 失败; 1 成功
    "msg" : "消息内容",
    "data" : { // 数据集

    }
}