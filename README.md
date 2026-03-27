# 菜鸟教程助手

把 `runoob.com` 放进 VS Code，减少浏览器和编辑器之间来回切换。

这版重点解决“入口不明显”的问题，现在正常安装后你应该能在 VS Code 左侧活动栏直接看到一个单独的“菜鸟教程”入口。

## 现在应该怎么找

安装完成并重载窗口后，你可以通过这几种方式打开它：

- 左侧活动栏里的“菜鸟教程”图标
- 状态栏左下角的 `菜鸟教程`
- 命令面板里的 `菜鸟教程: 打开侧边栏`

如果左侧活动栏没有立刻刷新，请先执行一次：

- `Developer: Reload Window`

## 主要功能

- 在 VS Code 内打开菜鸟教程首页、导航页和常用教程
- 在左侧活动栏提供单独的「菜鸟教程」入口
- 提供教程选择器，输入 `python`、`react`、`mysql` 之类的关键词就能快速跳转
- 支持“搜索当前选中内容”
- 自动记录最近打开的教程
- 左下角状态栏提供快捷入口

## 常用命令

安装或调试启动后，可以直接使用这些命令：

- `菜鸟教程: 打开侧边栏`
- `菜鸟教程: 打开首页`
- `菜鸟教程: 打开导航页`
- `菜鸟教程: 选择教程`
- `菜鸟教程: 搜索当前选中内容`
- `菜鸟教程: 打开 HTML/CSS/JS 在线工具`

## 调试方式

源码现在放在：

1. 用 VS Code 打开工作区 `D:\数据结构学习空间`
2. 按 `F5`
3. 在新的 Extension Development Host 窗口里测试扩展

启动配置会把扩展目录指向：

- `D:\数据结构学习空间\vscode-runoob-helper`

## 扩展目录

- `package.json`: 扩展清单、命令、视图、配置项
- `extension.js`: 扩展主逻辑

## 当前取舍

- 目前教程索引是内置的常用集合，不是全站抓取
- 关键词超出内置集合时，会提供 `site:runoob.com` 的 Bing 搜索兜底
- 页面承载优先复用 VS Code 自带的 Simple Browser 能力，兼容性会比手写 iframe 更稳

## 站点参考

我在实现前确认了这几个事实：

- 菜鸟教程首页提供大量分类入口，适合做快捷导航
- 常见教程页是稳定的独立 URL，例如 HTML、JavaScript、Python3、Git、VS Code
- 教程页普遍带在线实例，适合“边看边练”

示例页面：

- https://www.runoob.com/
- https://www.runoob.com/html/html-tutorial.html
- https://www.runoob.com/js/js-tutorial.html
- https://www.runoob.com/python3/python3-tutorial.html
- https://www.runoob.com/git/git-tutorial.html
