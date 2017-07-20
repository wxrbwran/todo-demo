

## 脚手架介绍
> 在这个环境下，Facebook 提供了一套不需要配置的 React 开发方案，即create-react-app。这个脚手架已经做好了基础 webpack 配置，带有自动更新，错误提示等等功能，仅仅需要创建，启动就可以快速开发。

这时也不得不提前端社区的另一个崛起者：**yarn**。

Yarn与 npm 一样，是一款 NodeJS 包管理工具。 为何要选择使用 yarn 呢？官网的描述是：

> Yarn 会缓存它下载的每个包，所以不需要重复下载。它还能并行化操作以最大化资源利用率，所以安装速度之快前所未有。

> Yarn 在每个安装包的代码执行前使用校验码验证包的完整性。

> Yarn 使用一个格式详尽但简洁的 lockfile 和一个精确的算法来安装，能够保证在一个系统上的运行的安装过程也会以同样的方式运行在其他系统上。
> 选用 Yarn 的原因也是因为他的速度提升比npm 要快，使用yarn add <package-name> ，yarn remove <package-name> 增删 node 包（对应npm install和npm uninstall）.

> 另一点是，yarn 在更新之后，集成了create, 通过yarn create，可以快速启动一个项目。

```
yarn create react-app my-app
yarn create react-native-app my-app
yarn create next-app my-app
```

### 如何使用
假设我们需要创建一个demo-app项目：

#### 创建目录yarn create react-app demo-app

稍等片刻，yarn 会为我们创建一个目录，拉取依赖，wepack 的配置通过 yarn 来调用，可以看到目录结构很干净



#### 开始开发：cd demo-app && yarn start
这时会启动一个默认端口为3000的页面，如果端口冲突，会提示你是否选用另一个端口
进入src目录开始开发即可

开发完成后需要发布时，运行yarn build进行编译，发布build目录
创建完成会自动生成build文件夹，将 js,css 文件放入 static 目录中,发布build目录即可

三部曲完成，中间省略了非常多配置问题，给需要快速构建项目带来了极大的便利性。当然，默认配置也许不能够满足所有需求，create-react-app也提供了 抛出所有配置项的yarn eject供给开发者使用，如果需要到调整 webpack 的内容，就需要使用到这个命令。不过这样也会导致不能再回滚。官方的更新比较快，如果不是必要的情况建议直接使用内置的行为。

## 配合 Express 构建 server 端应用
如果在项目开发过程中需要 express 构建server 端应用，那么开发模式就需要有小调整。

首先创建一个叫server的文件夹和初始化 package.json文件：
```
mkdir server && cd server && yarn init
```

#### 增加依赖包
```
yarn add express body-parser nodemon babel-cli babel-preset-es2015
```

主要用到express, body-parser, nodemon（检测node.js 改动并自动重启，适用于开发阶段）,babel-cli和babel-preset-es2015(以便使用 es6开发)
修改package.json，增加npm scripts
```
{
   "scripts": {
     "start": "nodemon --exec babel-node -- ./server.js",
     "build": "babel ./server.js --out-file server-compiled.js",
     "serve": "node server-compiled.js"
   }
 }
```
 
这里使用nodemon在开发阶段检测node.js 改动并自动重启
发布build的时候则通过 babel编译成 es5的文件
create-react-app会启动一个静态资源服务器，那么同时需要进行 server 端的时候需要怎么做呢？

我们回过头来去修改一下demo-app目录下的package.json。

create-react-app会默认添加好3段scripts:
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
  }
```

我们需要对 start和build做调整，以便可以同时启动前端开发页面以及后端服务。在这里引入concurrently这个包来执行两条命令：
```
yarn add concurrently
```

package.json:

```
"scripts": {
    "react-start": "react-scripts start",
    "start": "concurrently 'yarn react-start' 'cd server && yarn start'",
    "react-build": "react-scripts build",
    "build": "concurrently 'yarn react-build' 'cd server && yarn build'",
  },
```
这样，我们只要执行yarn start会同步启动 webpack 以及 server文件夹下的 nodeman.

### Proxy

如果我们在前端页面用使用fetch(/api/data)这样 请求，默认是会发送到create-react-app 启动的 localhost:3000/api/data去的，无法达到目的。为了指向 server 端，需要指定proxy:

假设 server 端 express 启动了5000端口，则需要在package.json中增加：
```
"proxy": "http://127.0.0.1:5000"
```
这时当你使用fetch(/api/data)请求，则会指向到localhost:5000/api/data

轻松的开始开发吧~