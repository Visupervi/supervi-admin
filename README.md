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