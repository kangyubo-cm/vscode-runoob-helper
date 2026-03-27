"use strict";

const vscode = require("vscode");

const SIMPLE_BROWSER_API_COMMAND = "simpleBrowser.api.open";
const SIMPLE_BROWSER_SHOW_COMMAND = "simpleBrowser.show";
const CONFIG_SECTION = "runoobHelper";
const RECENT_KEY = "recentEntries";

const ENTRIES = [
  {
    id: "home",
    label: "菜鸟教程首页",
    description: "全部教程与站内分类入口",
    url: "https://www.runoob.com/",
    category: "常用入口",
    keywords: ["首页", "导航", "教程", "目录", "分类"]
  },
  {
    id: "navigation",
    label: "教程导航页",
    description: "适合快速浏览各类教程",
    url: "https://www.runoob.com/navigation",
    category: "常用入口",
    keywords: ["导航", "目录", "分类", "全部教程"]
  },
  {
    id: "playground",
    label: "HTML/CSS/JS 在线工具",
    description: "菜鸟体系关联的前端在线编辑器",
    url: "https://www.jyshare.com/front-end/61",
    category: "常用入口",
    keywords: ["练习", "在线工具", "前端", "html", "css", "javascript"]
  },
  {
    id: "vscode",
    label: "VS Code 教程",
    description: "编辑器入门、调试与扩展使用",
    url: "https://www.runoob.com/vscode/vscode-tutorial.html",
    category: "开发工具",
    keywords: ["vscode", "visual studio code", "编辑器", "插件"]
  },
  {
    id: "html",
    label: "HTML 教程",
    description: "HTML5 标准入门",
    url: "https://www.runoob.com/html/html-tutorial.html",
    category: "前端",
    keywords: ["html", "网页", "前端", "标签"]
  },
  {
    id: "css",
    label: "CSS 教程",
    description: "样式与布局基础",
    url: "https://www.runoob.com/css/css-tutorial.html",
    category: "前端",
    keywords: ["css", "样式", "布局", "前端"]
  },
  {
    id: "javascript",
    label: "JavaScript 教程",
    description: "Web 编程核心语言",
    url: "https://www.runoob.com/js/js-tutorial.html",
    category: "前端",
    keywords: ["javascript", "js", "前端", "dom", "web"]
  },
  {
    id: "typescript",
    label: "TypeScript 教程",
    description: "JS 超集与类型系统",
    url: "https://www.runoob.com/typescript",
    category: "前端",
    keywords: ["typescript", "ts", "类型", "前端"]
  },
  {
    id: "react",
    label: "React 教程",
    description: "组件化前端框架",
    url: "https://www.runoob.com/react/react-tutorial.html",
    category: "前端",
    keywords: ["react", "jsx", "hooks", "前端"]
  },
  {
    id: "vue3",
    label: "Vue3 教程",
    description: "渐进式前端框架",
    url: "https://www.runoob.com/vue3/vue3-tutorial.html",
    category: "前端",
    keywords: ["vue", "vue3", "vite", "前端"]
  },
  {
    id: "nodejs",
    label: "Node.js 教程",
    description: "服务端 JavaScript",
    url: "https://www.runoob.com/nodejs",
    category: "前端",
    keywords: ["node", "nodejs", "javascript", "backend"]
  },
  {
    id: "playwright-doc",
    label: "Playwright 教程",
    description: "Web 自动化与测试",
    url: "https://www.runoob.com/playwright/playwright-tutorial.html",
    category: "前端",
    keywords: ["playwright", "测试", "自动化", "e2e"]
  },
  {
    id: "python3",
    label: "Python3 教程",
    description: "Python 主流版本入门",
    url: "https://www.runoob.com/python3/python3-tutorial.html",
    category: "后端与语言",
    keywords: ["python", "python3", "脚本", "ai"]
  },
  {
    id: "java",
    label: "Java 教程",
    description: "Java 基础与面向对象",
    url: "https://www.runoob.com/java/java-tutorial.html",
    category: "后端与语言",
    keywords: ["java", "jvm", "后端"]
  },
  {
    id: "c",
    label: "C 语言教程",
    description: "面向过程与系统编程基础",
    url: "https://www.runoob.com/cprogramming",
    category: "后端与语言",
    keywords: ["c", "c语言", "指针", "系统编程"]
  },
  {
    id: "cpp",
    label: "C++ 教程",
    description: "从 C 到现代 C++",
    url: "https://www.runoob.com/cplusplus/cpp-tutorial.html",
    category: "后端与语言",
    keywords: ["c++", "cpp", "模板", "面向对象"]
  },
  {
    id: "go",
    label: "Go 教程",
    description: "并发友好的现代语言",
    url: "https://www.runoob.com/go",
    category: "后端与语言",
    keywords: ["go", "golang", "并发", "后端"]
  },
  {
    id: "linux",
    label: "Linux 教程",
    description: "命令行与服务器基础",
    url: "https://www.runoob.com/linux",
    category: "后端与语言",
    keywords: ["linux", "shell", "命令行", "服务器"]
  },
  {
    id: "docker",
    label: "Docker 教程",
    description: "容器化基础",
    url: "https://www.runoob.com/docker/docker-tutorial.html",
    category: "后端与语言",
    keywords: ["docker", "容器", "部署"]
  },
  {
    id: "django",
    label: "Django 教程",
    description: "Python Web 框架",
    url: "https://www.runoob.com/django",
    category: "后端与语言",
    keywords: ["django", "python", "web", "orm"]
  },
  {
    id: "fastapi",
    label: "FastAPI 教程",
    description: "现代 Python API 框架",
    url: "https://www.runoob.com/fastapi/fastapi-tutorial.html",
    category: "后端与语言",
    keywords: ["fastapi", "python", "api", "backend"]
  },
  {
    id: "sql",
    label: "SQL 教程",
    description: "数据库查询语言基础",
    url: "https://www.runoob.com/sql/sql-tutorial.html",
    category: "数据库与工具",
    keywords: ["sql", "数据库", "查询"]
  },
  {
    id: "mysql",
    label: "MySQL 教程",
    description: "关系型数据库实战入门",
    url: "https://www.runoob.com/mysql/mysql-tutorial.html",
    category: "数据库与工具",
    keywords: ["mysql", "数据库", "sql"]
  },
  {
    id: "redis",
    label: "Redis 教程",
    description: "高性能键值数据库",
    url: "https://www.runoob.com/redis/redis-tutorial.html",
    category: "数据库与工具",
    keywords: ["redis", "缓存", "数据库"]
  },
  {
    id: "git",
    label: "Git 教程",
    description: "版本控制基础",
    url: "https://www.runoob.com/git/git-tutorial.html",
    category: "数据库与工具",
    keywords: ["git", "版本控制", "分支"]
  },
  {
    id: "markdown",
    label: "Markdown 教程",
    description: "笔记与文档书写语法",
    url: "https://www.runoob.com/markdown",
    category: "数据库与工具",
    keywords: ["markdown", "md", "文档", "笔记"]
  }
];

const ENTRY_MAP = new Map(ENTRIES.map((entry) => [entry.id, entry]));

const TREE_GROUPS = [
  {
    id: "favorites",
    label: "常用入口",
    description: "先把常用入口放在手边",
    icon: "star-full",
    entryIds: ["home", "navigation", "playground", "vscode"]
  },
  {
    id: "frontend",
    label: "前端开发",
    description: "HTML / CSS / JS 与常见框架",
    icon: "code",
    entryIds: [
      "html",
      "css",
      "javascript",
      "typescript",
      "react",
      "vue3",
      "nodejs",
      "playwright-doc"
    ]
  },
  {
    id: "backend",
    label: "后端与语言",
    description: "语言、框架、系统工具",
    icon: "server-process",
    entryIds: [
      "python3",
      "java",
      "c",
      "cpp",
      "go",
      "linux",
      "docker",
      "django",
      "fastapi"
    ]
  },
  {
    id: "data",
    label: "数据库与工具",
    description: "数据库、版本控制与文档工具",
    icon: "database",
    entryIds: ["sql", "mysql", "redis", "git", "markdown"]
  }
];

function activate(context) {
  const treeProvider = new RunoobTreeDataProvider(context);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("runoobExplorer", treeProvider)
  );

  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = "$(book) 菜鸟教程";
  statusBarItem.tooltip = "打开菜鸟教程侧边栏";
  statusBarItem.command = "runoobHelper.focusSidebar";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  context.subscriptions.push(
    vscode.commands.registerCommand("runoobHelper.openHome", async () => {
      await openEntry(context, treeProvider, ENTRY_MAP.get("home"));
    }),
    vscode.commands.registerCommand("runoobHelper.openNavigation", async () => {
      await openEntry(context, treeProvider, ENTRY_MAP.get("navigation"));
    }),
    vscode.commands.registerCommand("runoobHelper.openPlayground", async () => {
      await openEntry(context, treeProvider, ENTRY_MAP.get("playground"));
    }),
    vscode.commands.registerCommand("runoobHelper.pickTutorial", async () => {
      const picked = await showEntryPicker(context);
      if (picked) {
        await openEntry(context, treeProvider, picked);
      }
    }),
    vscode.commands.registerCommand("runoobHelper.searchSelection", async () => {
      const keyword = getSelectionOrWord();
      if (!keyword) {
        vscode.window.showInformationMessage(
          "先选中一段文字，或者把光标放在一个单词上。"
        );
        return;
      }

      const matches = matchEntries(keyword);
      if (matches.length === 1 && isStrongMatch(keyword, matches[0])) {
        await openEntry(context, treeProvider, matches[0]);
        return;
      }

      const picked = await showEntryPicker(context, keyword);
      if (picked) {
        await openEntry(context, treeProvider, picked);
      }
    }),
    vscode.commands.registerCommand("runoobHelper.openEntry", async (entry) => {
      const resolved = resolveEntry(entry);
      if (!resolved) {
        return;
      }
      await openEntry(context, treeProvider, resolved);
    }),
    vscode.commands.registerCommand("runoobHelper.copyLink", async (entry) => {
      const resolved = resolveEntry(entry);
      if (!resolved) {
        return;
      }
      await vscode.env.clipboard.writeText(resolved.url);
      vscode.window.showInformationMessage(`已复制链接：${resolved.label}`);
    }),
    vscode.commands.registerCommand("runoobHelper.clearRecent", async () => {
      await context.globalState.update(RECENT_KEY, []);
      treeProvider.refresh();
      vscode.window.showInformationMessage("已清空最近打开记录。");
    }),
    vscode.commands.registerCommand("runoobHelper.focusSidebar", async () => {
      await vscode.commands.executeCommand("workbench.view.extension.runoobSidebar");
    })
  );
}

function deactivate() {}

class RunoobTreeDataProvider {
  constructor(context) {
    this.context = context;
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!element) {
      const rootItems = [];
      const recentEntries = getRecentEntries(this.context);

      if (recentEntries.length) {
        rootItems.push(
          new CategoryTreeItem(
            "最近打开",
            "你最近在 VS Code 里看过的教程",
            recentEntries,
            "history"
          )
        );
      }

      for (const group of TREE_GROUPS) {
        rootItems.push(
          new CategoryTreeItem(
            group.label,
            group.description,
            group.entryIds.map((id) => ENTRY_MAP.get(id)).filter(Boolean),
            group.icon
          )
        );
      }

      return rootItems;
    }

    if (element instanceof CategoryTreeItem) {
      return element.entries.map((entry) => new LinkTreeItem(entry));
    }

    return [];
  }
}

class CategoryTreeItem extends vscode.TreeItem {
  constructor(label, description, entries, iconId) {
    super(label, vscode.TreeItemCollapsibleState.Expanded);
    this.description = description;
    this.entries = entries;
    this.contextValue = "runoobCategory";
    this.iconPath = new vscode.ThemeIcon(iconId);
  }
}

class LinkTreeItem extends vscode.TreeItem {
  constructor(entry) {
    super(entry.label, vscode.TreeItemCollapsibleState.None);
    this.entry = entry;
    this.description = entry.description;
    this.tooltip = `${entry.label}\n${entry.url}`;
    this.contextValue = "runoobLink";
    this.iconPath = new vscode.ThemeIcon("link-external");
    this.command = {
      command: "runoobHelper.openEntry",
      title: "打开",
      arguments: [entry]
    };
  }
}

function resolveEntry(entry) {
  if (!entry) {
    return undefined;
  }

  if (typeof entry === "string") {
    return ENTRY_MAP.get(entry);
  }

  if (entry.entry) {
    return entry.entry;
  }

  if (entry.url && entry.label) {
    return entry;
  }

  return undefined;
}

async function openEntry(context, treeProvider, entry) {
  const browserOptions = getBrowserOptions();

  try {
    await vscode.commands.executeCommand(
      SIMPLE_BROWSER_API_COMMAND,
      vscode.Uri.parse(entry.url),
      browserOptions
    );
  } catch (error) {
    await vscode.commands.executeCommand(SIMPLE_BROWSER_SHOW_COMMAND, entry.url);
  }

  await rememberRecentEntry(context, entry);
  treeProvider.refresh();
}

function getBrowserOptions() {
  const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
  const openMode = config.get("openMode", "beside");
  const preserveFocus = config.get("preserveFocus", false);

  return {
    preserveFocus,
    viewColumn:
      openMode === "beside" ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active
  };
}

async function rememberRecentEntry(context, entry) {
  const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
  const limit = config.get("recentLimit", 8);
  const current = getRecentEntries(context).filter(
    (item) => item.url !== entry.url
  );

  current.unshift({
    id: entry.id,
    label: entry.label,
    description: entry.description,
    url: entry.url,
    category: entry.category,
    keywords: entry.keywords
  });

  await context.globalState.update(RECENT_KEY, current.slice(0, limit));
}

function getRecentEntries(context) {
  const recent = context.globalState.get(RECENT_KEY, []);
  if (!Array.isArray(recent)) {
    return [];
  }
  return recent.filter((item) => item && item.url && item.label);
}

function getSelectionOrWord() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return "";
  }

  const selectedText = editor.document.getText(editor.selection).trim();
  if (selectedText) {
    return selectedText;
  }

  const wordRange = editor.document.getWordRangeAtPosition(editor.selection.active);
  if (!wordRange) {
    return "";
  }

  return editor.document.getText(wordRange).trim();
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "");
}

function isStrongMatch(keyword, entry) {
  const normalizedKeyword = normalizeText(keyword);
  if (!normalizedKeyword) {
    return false;
  }

  const directFields = [entry.label, entry.category, ...(entry.keywords || [])];
  return directFields.some((field) => normalizeText(field) === normalizedKeyword);
}

function matchEntries(keyword) {
  const normalizedKeyword = normalizeText(keyword);
  if (!normalizedKeyword) {
    return [...ENTRIES];
  }

  return ENTRIES.map((entry) => ({
    entry,
    score: scoreEntry(entry, normalizedKeyword)
  }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((item) => item.entry);
}

function scoreEntry(entry, normalizedKeyword) {
  let score = 0;

  const label = normalizeText(entry.label);
  const category = normalizeText(entry.category);
  const description = normalizeText(entry.description);
  const url = normalizeText(entry.url);
  const keywords = (entry.keywords || []).map(normalizeText);

  if (label === normalizedKeyword) {
    score += 100;
  }
  if (keywords.includes(normalizedKeyword)) {
    score += 90;
  }
  if (label.includes(normalizedKeyword)) {
    score += 70;
  }
  if (description.includes(normalizedKeyword)) {
    score += 40;
  }
  if (category.includes(normalizedKeyword)) {
    score += 20;
  }
  if (url.includes(normalizedKeyword)) {
    score += 10;
  }

  return score;
}

function buildSearchEntry(keyword) {
  const query = encodeURIComponent(`site:runoob.com ${keyword}`);
  return {
    id: `search:${keyword}`,
    label: `站外搜索：${keyword}`,
    description: "使用 Bing 仅搜索 runoob.com 结果",
    url: `https://cn.bing.com/search?q=${query}`,
    category: "搜索",
    keywords: [keyword]
  };
}

async function showEntryPicker(context, initialValue = "") {
  const quickPick = vscode.window.createQuickPick();
  quickPick.title = "菜鸟教程";
  quickPick.placeholder = "输入关键词筛选教程，比如 python、react、mysql";
  quickPick.matchOnDescription = true;
  quickPick.matchOnDetail = true;
  quickPick.value = initialValue;

  const refreshItems = () => {
    const keyword = quickPick.value.trim();
    const items = [];

    if (!keyword) {
      const recentEntries = getRecentEntries(context);
      if (recentEntries.length) {
        items.push({
          kind: vscode.QuickPickItemKind.Separator,
          label: "最近打开"
        });
        items.push(...recentEntries.map(toQuickPickItem));
      }

      items.push({
        kind: vscode.QuickPickItemKind.Separator,
        label: "推荐条目"
      });

      const defaultEntries = [
        ENTRY_MAP.get("home"),
        ENTRY_MAP.get("navigation"),
        ENTRY_MAP.get("html"),
        ENTRY_MAP.get("javascript"),
        ENTRY_MAP.get("python3"),
        ENTRY_MAP.get("git"),
        ENTRY_MAP.get("vscode"),
        ENTRY_MAP.get("playground")
      ].filter(Boolean);

      items.push(...defaultEntries.map(toQuickPickItem));
    } else {
      const matches = matchEntries(keyword).slice(0, 12);
      if (matches.length) {
        items.push({
          kind: vscode.QuickPickItemKind.Separator,
          label: `教程匹配 (${matches.length})`
        });
        items.push(...matches.map(toQuickPickItem));
      }

      items.push({
        kind: vscode.QuickPickItemKind.Separator,
        label: "更多方式"
      });
      items.push(toQuickPickItem(buildSearchEntry(keyword)));
      items.push(toQuickPickItem(ENTRY_MAP.get("navigation")));
      items.push(toQuickPickItem(ENTRY_MAP.get("home")));
    }

    quickPick.items = items;
  };

  refreshItems();

  return new Promise((resolve) => {
    let settled = false;

    const finish = (result) => {
      if (settled) {
        return;
      }
      settled = true;
      quickPick.dispose();
      resolve(result);
    };

    quickPick.onDidChangeValue(() => {
      refreshItems();
    });

    quickPick.onDidAccept(() => {
      const selected = quickPick.selectedItems[0];
      if (selected && selected.entry) {
        finish(selected.entry);
      }
    });

    quickPick.onDidHide(() => finish(undefined));
    quickPick.show();
  });
}

function toQuickPickItem(entry) {
  return {
    label: entry.label,
    description: entry.description,
    detail: entry.url,
    entry
  };
}

module.exports = {
  activate,
  deactivate
};
