Taro+mobx+typescript项目模板。

## 环境依赖
> 要求
- taro >= 3.0
> 安装依赖
```
yarn
```
> 项目目录
```
├── dist                   编译结果目录
├── config                 配置目录
|   ├── dev.js             开发时配置
|   ├── index.js           默认配置
|   └── prod.js            打包时配置
├── src                    源码目录
|   ├── assets             静态资源目录
|   ├── components         组件目录
|   ├── config             项目配置文件目录
|   ├── enum               枚举文件目录
|   ├── pages              页面文件目录
|   |   ├── index          index 页面目录
|   |   |   ├── index.ts   index 页面逻辑
|   |   |   └── index.less index 页面样式
|   ├── services           后台接口请求服务目录
|   ├── store              mobx store 目录
|   ├── style              less 公共样式目录
|   ├── typings            命名空间声明文件
|   ├── utils              工具库
|   ├── app.config.ts      路由文件
|   ├── app.less           项目总通用样式
|   └── app.ts             项目入口文件
|   └── index.html         html生成模板文件
├── package.json
├── alias.ts               别名表
└── sentry.properties      报错日志服务器配置文件
```
> 编译配置目录(config)详细配置

[访问Taro编译配置详情](https://taro-docs.jd.com/taro/docs/config-detail)
##部署
> 分支说明
- master：用于正式版本发布
- develop：开发调试分支
> 开发调试
```
yarn start
```

> 测试服务器
```
yarn build:h5
```
- 测试服访问地址（最新：2020-09-23）
[测试服务器](https://www.xxxxxxx.cn)

> 发布正式代码
- 需要切换分支到master下
- 执行命令
```
git push
```
- git 仓库存在钩子，会自动构建
- 如果手动构建运行
```
yarn run build:h5
```
- 正式服访问地址
[正式服务器](https://www.xxx.com/)

> 版本日志
- v1.0.0
```
首发
```
