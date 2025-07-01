// components/doc/Sidebar.tsx
"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function DocSidebar() {
    // 菜单项数据结构
    const sections = [
        {
            title: "快速入门",
            items: [{ name: "新手必看", href: "/docs/quick-start" }],
        },
        {
            title: "@pureadmin/utils文档",
            items: [],
        },
        {
            title: "指南",
            items: [
                { name: "快速开始", href: "/docs/guide/start" },
                { name: "目录结构", href: "/docs/guide/structure" },
                { name: ".vscode文件夹详解", href: "/docs/guide/vscode" },
                { name: "平台配置", href: "/docs/guide/configuration" },
                { name: "布局", href: "/docs/guide/layout" },
                { name: "路由和菜单", href: "/docs/guide/routing" },
                { name: "HTTP请求", href: "/docs/guide/http" },
                { name: "打包和部署", href: "/docs/guide/deployment" },
            ],
        },
        {
            title: "进阶",
            items: [
                { name: "图标", href: "/docs/advanced/icons", new: true },
                { name: "主题和暗黑模式", href: "/docs/advanced/theming" },
                { name: "国际化", href: "/docs/advanced/i18n" },
                { name: "Tailwind CSS", href: "/docs/advanced/tailwind", new: true },
                { name: "RBAC权限", href: "/docs/advanced/rbac" },
                { name: "类型声明", href: "/docs/advanced/types" },
                { name: "单点登录", href: "/docs/advanced/sso" },
                { name: "自定义免登录", href: "/docs/advanced/auth" },
                { name: "打包优化", href: "/docs/advanced/optimization" },
                { name: "Vite预构建", href: "/docs/advanced/pre-building" },
            ],
        },
        {
            title: "生态",
            items: [],
        },
    ];

    // 在线预览链接
    const previewLinks = [
        {
            title: "完整版本",
            description: "点我查看完整版本",
            href: "#"
        },
        {
            title: "精简版本",
            description: "精简版是基于vue-pure-admin提炼出的架子，包含主体功能，更适合实际项目开发",
            href: "#",
            subLinks: [
                { name: "国际化精简版", href: "#" },
                { name: "非国际化精简版", href: "#" }
            ]
        },
        {
            title: "JS 版本",
            description: "点我查看js版本",
            href: "#",
            subLinks: [
                { name: "max-ts版本", href: "#" },
                { name: "max-js版本", href: "#" },
                { name: "微前端版本", href: "#" },
                { name: "Nodejs后端", href: "#" },
                { name: "Tauri版本", href: "#" },
                { name: "Electron版本", href: "#" }
            ]
        }
    ];

    // 底部链接
    const footerLinks = [
        { name: "配套视频", href: "#" },
        { name: "浏览器支持", href: "#" },
        { name: "维护者", href: "#" },
        { name: "问题反馈", href: "#" },
        { name: "解答微信群", href: "#" }
    ];

    return (
        <div className="w-64 bg-background border-r h-screen flex flex-col overflow-hidden">
            {/* 顶部标题区域 */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold">PureAdmin Docs</h1>
                        <p className="text-sm text-muted-foreground">v1.0.0</p>
                    </div>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatar.png" alt="User" />
                        <AvatarFallback>PA</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <Separator />

            {/* 主要导航区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <Accordion type="multiple" className="w-full">
                    {sections.map((section, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-0">
                            {section.items.length > 0 ? (
                                <>
                                    <AccordionTrigger className="py-2 px-3 bg-gray-50 rounded-md hover:bg-gray-100">
                                        <span className="font-medium">{section.title}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-0 pl-2">
                                        <div className="space-y-1">
                                            {section.items.map((item, itemIndex) => (
                                                <Link
                                                    key={itemIndex}
                                                    href={item.href}
                                                    className="flex items-center py-1.5 px-3 text-sm rounded-md hover:bg-accent transition-colors"
                                                >
                                                    {item.name}
                                                    {item.new && (
                                                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                              New
                            </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </>
                            ) : (
                                <Link
                                    href="#"
                                    className="flex py-2 px-3 bg-gray-50 rounded-md hover:bg-gray-100 font-medium"
                                >
                                    {section.title}
                                </Link>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>

                <Separator />

                {/* 在线预览区域 */}
                <div className="space-y-4">
                    <h2 className="font-semibold">在线预览</h2>

                    {previewLinks.map((link, index) => (
                        <div key={index} className="bg-gray-50 rounded-md p-3">
                            <h3 className="font-medium">{link.title}</h3>
                            <p className="text-sm text-muted-foreground my-2">{link.description}</p>

                            {link.subLinks ? (
                                <div className="mt-2 space-y-1">
                                    {link.subLinks.map((subLink, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            href={subLink.href}
                                            className="flex items-center text-sm py-1.5 px-2 rounded hover:bg-gray-100"
                                        >
                                            <span className="mr-1">-</span> {subLink.name}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Button variant="outline" size="sm" className="w-full mt-2">
                                    {link.description}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 底部链接区域 */}
            <div className="p-4 border-t">
                <div className="space-y-2 text-sm">
                    {footerLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="block text-muted-foreground hover:text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
