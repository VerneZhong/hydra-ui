# hydra-ui

> 这是一个基于vue-admin-template 4.0.0搭建的后台管理系统。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

## Build Setup

# 进入项目目录
cd hydra-ui/

# 安装依赖
npm install

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```