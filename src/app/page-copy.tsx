"use client"

// import { useState } from 'react';
import Head from 'next/head';
import {useRouter} from "next/navigation";

// import Image from 'next/image';

export default function Home() {
    // const [activeTab, setActiveTab] = useState('features');
    const router = useRouter();
    const features = [
        {
            icon: '💻',
            title: '现代技术栈构建',
            description: '基于Next.js、Tailwind CSS、TypeScript等最新技术栈开发，确保高性能和现代开发体验'
        },
        {
            icon: '⚡',
            title: '极速性能优化',
            description: '内置代码拆分、预加载、图像优化等功能，确保您的简历在各类设备上闪电般加载'
        },
        {
            icon: '📱',
            title: '响应式设计',
            description: '完美适配所有设备尺寸，从手机到4K显示器都能提供出色的浏览体验'
        },
        {
            icon: '🔧',
            title: '高度可定制主题',
            description: '提供深色/浅色模式切换，以及自定义配色方案，打造个性化展示空间'
        },
        {
            icon: '📁',
            title: '模板化内容管理',
            description: '使用简单的JSON数据填充简历内容，无需复杂代码修改'
        },
        {
            icon: '🔒',
            title: '完全免费开源',
            description: 'MIT许可证授权，您可以在任何项目中自由使用和修改'
        }
    ];

    const stats = [
        { label: '项目经验', value: '12+' },
        { label: '技术栈掌握', value: '15+' },
        { label: '贡献开源', value: '8' },
        { label: '年资', value: '5' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Head>
                <title>Pure Portfolio | 专业简历模板</title>
                <meta name="description" content="开源免费的现代化简历模板系统" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* 导航栏 */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-lg shadow-sm z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="bg-blue-600 rounded-md w-10 h-10 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">PP</span>
                            </div>
                            <h1 className="ml-3 text-xl font-bold text-gray-800">
                                Pure<span className="text-blue-600">Portfolio</span>
                            </h1>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">首页</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">功能</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">模板</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">使用指南</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">示例</a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center px-3 py-1 bg-blue-50 rounded-md border border-blue-100">
                                <span className="text-blue-600 font-semibold">v1.0.0</span>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                在线预览 →
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 主内容区 */}
            <main className="pt-24 pb-16">
                {/* 头部介绍区域 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center bg-blue-50 px-4 py-1 rounded-full border border-blue-100 mb-4">
                            <span className="bg-blue-500 h-2 w-2 rounded-full mr-2"></span>
                            <span className="text-blue-600 font-medium">新版本发布 v1.0.0</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                            构建出色的<span className="text-blue-600">开发者简历</span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            一款开源免费、开箱即用的专业简历展示模板系统，专为技术人员设计
                        </p>

                        <div className="flex justify-center space-x-4">
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition" onClick={()=>{router.push('/discovery_feed')}}>
                                快速开始 →
                            </button>
                            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition">
                                查看示例
                            </button>
                        </div>
                    </div>
                </section>

                {/* 技术栈展示 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="bg-white rounded-2xl shadow-lg p-10 glass-card">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">核心技术栈</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="tech-card">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <div className="bg-blue-600 w-10 h-10 rounded-md flex items-center justify-center">
                                        <span className="text-white font-bold">N</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">Next.js</h3>
                                <p className="text-gray-600 text-sm mt-1">React 全栈框架</p>
                            </div>

                            <div className="tech-card">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <div className="bg-indigo-500 w-10 h-10 rounded-md flex items-center justify-center">
                                        <span className="text-white font-bold">T</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">Tailwind CSS</h3>
                                <p className="text-gray-600 text-sm mt-1">原子化CSS框架</p>
                            </div>

                            <div className="tech-card">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <div className="bg-blue-500 w-10 h-10 rounded-md flex items-center justify-center">
                                        <span className="text-white font-bold">TS</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">TypeScript</h3>
                                <p className="text-gray-600 text-sm mt-1">强类型JavaScript</p>
                            </div>

                            <div className="tech-card">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <div className="bg-red-500 w-10 h-10 rounded-md flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">响应式设计</h3>
                                <p className="text-gray-600 text-sm mt-1">全设备适配</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 特性展示 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="flex justify-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800">核心特性</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="p-8">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                                        <span className="text-3xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 数据统计 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-1">
                        <div className="bg-white rounded-[22px] p-12">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                        <div className="text-gray-600 text-lg">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="max-w-2xl mx-auto mt-16">
                                <h3 className="text-2xl font-bold text-center mb-6">为什么选择 Pure Portfolio?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">快速部署</h4>
                                            <p className="text-gray-600 text-sm">支持静态导出，一键部署到各大平台</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">性能优化</h4>
                                            <p className="text-gray-600 text-sm">100/100的Lighthouse性能得分</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">主题定制</h4>
                                            <p className="text-gray-600 text-sm">内置多种配色方案和布局选项</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">内容管理</h4>
                                            <p className="text-gray-600 text-sm">可视化编辑器，轻松更新简历内容</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* 底部区域 */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-600 rounded-md w-10 h-10 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">PP</span>
                                </div>
                                <h2 className="ml-3 text-xl font-bold">Pure<span className="text-blue-400">Portfolio</span></h2>
                            </div>
                            <p className="text-gray-400 mb-6">
                                打造专业的开发者简历，助力您的职业生涯发展
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .27.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">产品</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-white">特性</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">模板</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">示例</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">文档</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">更新日志</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">支持</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-white">帮助中心</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">社区论坛</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">服务状态</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">联系我们</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">订阅更新</h3>
                            <p className="text-gray-400 mb-4">获取最新模板和功能更新</p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="您的电子邮件"
                                    className="px-4 py-2 bg-gray-800 text-white rounded-l flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition"
                                >
                                    →
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400">© {new Date().getFullYear()} Pure Portfolio. 保留所有权利.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white">隐私政策</a>
                            <a href="#" className="text-gray-400 hover:text-white">服务条款</a>
                            <a href="#" className="text-gray-400 hover:text-white">许可证书</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
