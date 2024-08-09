# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

1. 在vite中如何配置@别名
（1）在vite.config.js中添加
```
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src")
    }
  }
```
（2）在页面中输入@后出现联想提示路径

  新建jsconfig.js
  ```
    {
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*":["src/*"] // vscode @提示
    },
    "experimentalDecorators": true,
    "jsx": "preserve"
  }
}
  ```

2. 在vite中如何配置支持less

  只需要安装less就可以

  #### 前端权限管理的模型

  ACL: 基于用户的权限管理模型
  只需要针对当前用户授权或取消授权

  RBAC: 基于角色权限管理模型
  用户与角色关联，角色与权限关联

  ABAC: 基于属性的权限管理模型

  loader本身是一个函数，返回转换后的结果

  plugin是插件，基于事件流框架，Tapable，扩展webpack的功能，webpack在运行期间会广播很多事件，plugin可以监听这些事件，修改内容。

  ##### webpack的构建流程：

  首先是一个串行过程：
    1：首先初始化参数，读取配置文件
    2：开始编译：初始化Compiler, 加载所有插件，执行对象run方法，开始编译
    3：确定入口：entry找到入口
    4：编译模块：调用所有的loader对模块进行翻译，找出模块依赖的模块，在递归本步骤直到所有文件全部经过处理
    5：完成模块编译
    6: 输出资源
    7：输出结束，根据配置输出路径和文件名
  ###### webpack 常见的事件

  before-run
  run
  before-compile
  compile
  this-compilation 
  compilation 
  emit: 输出文件前
  after: 输出文件后

  模块联邦：

  多个模块之间共享代码机制

  ModuleFederatinPlugin


  #### typescript

  ##### 高级类型

  - 交叉类型
  将多个类型合并成一个
  T & U 

  - 联合类型

    T | U

  - 类型别名
  type Some = some
  也就说type可以用在联合类型中
  
  - 类型索引
  keyof 类似Object.keys

    ```typeScript

    interface Button {
      type: string
      text: string
    }

    type ButtonKeys = keyof Button // 输出的是一个联合类型， type | text
    ```
  - 类型约束
  extends

    ```typeScript
      type BaseType = string | number | boolean

      function copy<T extends BaseType>(arg:T)T{
        return arg
      }
    ```
    类型约束一般和索引类型一起使用

    ```typeScript

    function getValue<T, K extends keyof T>(obj: T, key: K): T[K]{
      return obj[key]
    }
    ```

  - 映射类型

    in 

    ```typeScript

    type Readonly<T> = {
      readonly [P in keyof T]: T[P]
    }
    ```
  - 条件类型

  T extends U ? X : Y



##### 接口 interface

```typeScript



```