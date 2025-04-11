# 时间与新闻显示页面

这是一个显示时间和热点新闻的页面，使用 HTML、CSS 和 JavaScript 构建，可以部署在 GitHub Pages 上。

## 功能特点

- 实时显示当前时间和日期
- 显示中国热点新闻
- 响应式设计，适配各种设备
- 现代简约的界面设计

## 使用方法

1. 首先，你需要在 [NewsAPI](https://newsapi.org/) 注册账号并获取 API 密钥
2. 在 `script.js` 文件中，将 `YOUR_API_KEY` 替换为你的 NewsAPI API 密钥
3. 将代码推送到 GitHub 仓库
4. 在仓库设置中启用 GitHub Pages

## 部署步骤

1. 创建新的 GitHub 仓库
2. 将代码推送到仓库：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <你的仓库URL>
   git push -u origin main
   ```
3. 在仓库设置中，找到 "Pages" 选项
4. 选择 main 分支作为源
5. 保存设置后，你的页面将在几分钟内部署完成

## 注意事项

- 建议使用现代浏览器访问以获得最佳体验
- NewsAPI 在开发环境下有调用限制，请合理使用
- 新闻数据每5分钟自动更新一次 