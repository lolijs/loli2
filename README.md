# loli2

1. loli index 要 读取子项目的 index.js 配置 自己;
2. 子项目 index.js 实现接口, onload 等;
3. hashchange 的时候, 找制定目录下的文件, 如果有, 执行文件; 如果没有 执行onload;

aui onload
1. 查找本地配置文件; 如果有, 执行本地配置文件生成页面,再请求服务端 渲染数据; 如果没有配置文件 请求服务端, 通过数据生成页面, 并渲染数据;