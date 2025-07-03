'use client';
import React, {useState} from 'react';
import MdEditor from "@/components/Markdown/MdEditor";

const defaultMarkdown = `# Markdown 编辑器示例

这是一个功能完整的Markdown编辑器实现。

## 核心功能

- ✏️ **独立编辑器组件** - 编辑功能模块化
- 👁️ **实时预览** - 即时查看渲染效果
- 🌓 **主题支持** - 亮色/暗色模式
- 🔄 **滚动同步** - 编辑与预览区域同步滚动

## 使用方法

1. 在左侧编辑Markdown内容
2. 右侧实时预览渲染效果
3. 使用滚动同步功能对比内容

\`\`\`js
// 代码示例
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

> 提示：此编辑器基于 markdown-to-jsx 和 CodeMirror 实现

---

**Happy coding!** 🚀
`;

const FullEditor = () => {
    const [markdownContent, setMarkdownContent] = useState(defaultMarkdown);

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            <header className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    高级 Markdown 编辑器
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    双栏编辑与实时预览 | 支持亮色/暗色主题
                </p>
            </header>

            <div className="flex flex-1 overflow-hidden  h-96">
                <div className="flex-1 border-r dark:border-gray-700">
                    <MdEditor
                        value={markdownContent}
                        onChange={setMarkdownContent}
                    />
                </div>
            </div>
        </div>
    );
};

export default FullEditor;
