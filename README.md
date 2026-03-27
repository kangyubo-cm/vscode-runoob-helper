# 菜鸟教程助手

把 `runoob.com` 放进 VS Code 侧边栏，减少浏览器和编辑器来回切换，更适合边学边敲代码。

## 适合谁

- 想边看菜鸟教程边写代码练习的初学者
- 希望把常用教程固定在 VS Code 里的中文开发者
- 不想频繁切到浏览器找教程页的人

## 功能

- 在左侧活动栏提供单独的“菜鸟教程”入口
- 在 VS Code 内快速打开菜鸟教程首页、导航页和常用教程
- 提供教程选择器，可按 `python`、`react`、`mysql` 等关键词快速跳转
- 支持对当前选中内容进行教程匹配搜索
- 自动记录最近打开的教程
- 在状态栏提供快捷入口

## 安装后怎么找

安装并重载窗口后，可以通过以下方式打开：

- 左侧活动栏中的“菜鸟教程”
- 左下角状态栏中的 `菜鸟教程`
- 命令面板中的 `菜鸟教程: 打开侧边栏`

如果入口没有立即出现，请执行一次 `Developer: Reload Window`。

## 常用命令

- `菜鸟教程: 打开侧边栏`
- `菜鸟教程: 打开首页`
- `菜鸟教程: 打开导航页`
- `菜鸟教程: 选择教程`
- `菜鸟教程: 搜索当前选中内容`
- `菜鸟教程: 打开 HTML/CSS/JS 在线工具`

## 配置项

- `runoobHelper.openMode`
  控制教程是在当前列还是旁边打开，默认是 `beside`
- `runoobHelper.preserveFocus`
  控制打开教程后是否保留代码编辑器焦点
- `runoobHelper.recentLimit`
  控制最近打开记录的数量上限

## 本地开发

1. 用 VS Code 打开 `D:\数据结构学习空间`
2. 按 `F5`
3. 在新的 Extension Development Host 窗口里测试扩展

相关源码：

- `package.json`: 扩展清单、命令、视图和配置项
- `extension.js`: 主逻辑
- `media/sidebar.svg`: 活动栏图标

## 当前实现取舍

- 教程索引目前是常用集合，不是全站抓取
- 超出内置集合的关键词，会走 `site:runoob.com` 搜索兜底
- 页面承载优先复用 VS Code 自带的 Simple Browser，兼容性比手写 iframe 更稳

## 参考页面

- https://www.runoob.com/
- https://www.runoob.com/html/html-tutorial.html
- https://www.runoob.com/js/js-tutorial.html
- https://www.runoob.com/python3/python3-tutorial.html
- https://www.runoob.com/git/git-tutorial.html
