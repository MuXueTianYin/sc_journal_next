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
            icon: '📝',
            title: '心动瞬间',
            description: '记录每一次心跳加速的相遇，每一句甜蜜的对话'
        },
        {
            icon: '🖼️',
            title: '回忆相册',
            description: '珍藏那些让你嘴角上扬的合影和特别的时刻'
        },
        {
            icon: '📅',
            title: '爱情日历',
            description: '标记所有重要的日子：相识日、初吻日、纪念日'
        },
        {
            icon: '💌',
            title: '情书信箱',
            description: '写下那些当面说不出口的悄悄话和真心话'
        },
        {
            icon: '🗺️',
            title: '恋爱地图',
            description: '标记一起去过的地方，计划未来的浪漫旅行'
        },
        {
            icon: '🔐',
            title: '私密空间',
            description: '仅属于我们两人的小天地，安全加密的甜蜜空间'
        }
    ];

    const stats = [
        { label: '相识天数', value: '66' },
        { label: '心动时刻', value: '100+' },
        { label: '约会次数', value: '3' },
        { label: '未来计划', value: '永远' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
            <Head>
                <title>澄心相印 | 我们的爱情空间</title>
                <meta name="description" content="记录我们爱情点滴的私密空间" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* 导航栏 */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-lg shadow-sm z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="bg-rose-500 rounded-md w-10 h-10 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">❤️</span>
                            </div>
                            <h1 className="ml-3 text-xl font-bold text-gray-800">
                                澄心<span className="text-rose-500">相印</span>
                            </h1>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">爱的首页</a>
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">心动瞬间</a>
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">回忆相册</a>
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">情书信箱</a>
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">恋爱地图</a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center px-3 py-1 bg-rose-50 rounded-md border border-rose-100">
                                <span className="text-rose-500 font-semibold">v1.0.0</span>
                            </div>
                            <button className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition">
                                写新日记 →
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
                        <div className="inline-flex items-center bg-rose-50 px-4 py-1 rounded-full border border-rose-100 mb-4">
                            <span className="bg-rose-500 h-2 w-2 rounded-full mr-2"></span>
                            <span className="text-rose-500 font-medium">新版甜蜜上线 v1.0.0</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                            记录我们<span className="text-rose-500">爱的旅程</span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            从相遇的那天起，到香港重逢的惊喜，再到深圳定情的浪漫
                        </p>

                        <div className="flex justify-center space-x-4">
                            <button className="bg-rose-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-rose-600 transition" onClick={()=>{router.push('/discovery_feed')}}>
                                写新日记 →
                            </button>
                            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition">
                                查看回忆
                            </button>
                        </div>
                    </div>
                </section>

                {/* 重要时刻展示 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="bg-white rounded-2xl shadow-lg p-10 glass-card">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">爱情里程碑</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="tech-card">
                                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                                    <div className="bg-rose-500 w-10 h-10 rounded-md flex items-center justify-center">
                                        <span className="text-white font-bold">🎧</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">初次相遇</h3>
                                <p className="text-gray-600 text-sm mt-1">2025年4月26日</p>
                            </div>

                            <div className="tech-card">
                                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                                    <div className="bg-pink-500 w-10 h-10 rounded-md flex items-center justify-center">
                                        <span className="text-white font-bold">🇭🇰</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">香港重逢</h3>
                                <p className="text-gray-600 text-sm mt-1">2025年5月17日</p>
                            </div>

                            <div className="tech-card">
                                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                                    <div className="bg-rose-400 w-10 h-10 rounded-md flex items-center justify-center">
                                        <span className="text-white font-bold">🎡</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">深圳定情</h3>
                                <p className="text-gray-600 text-sm mt-1">2025年5月24日</p>
                            </div>

                            <div className="tech-card">
                                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                                    <div className="bg-red-400 w-10 h-10 rounded-md flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">未来计划</h3>
                                <p className="text-gray-600 text-sm mt-1">更多美好等待书写</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 特性展示 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="flex justify-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800">记录我们的爱</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="p-8">
                                    <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-6">
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
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-1">
                        <div className="bg-white rounded-[22px] p-12">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-5xl font-bold text-rose-500 mb-2">{stat.value}</div>
                                        <div className="text-gray-600 text-lg">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="max-w-2xl mx-auto mt-16">
                                <h3 className="text-2xl font-bold text-center mb-6">为什么记录我们的故事？</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start">
                                        <div className="bg-rose-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">珍藏心动瞬间</h4>
                                            <p className="text-gray-600 text-sm">保存那些让你心跳加速的时刻</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-rose-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">重温甜蜜回忆</h4>
                                            <p className="text-gray-600 text-sm">随时回顾那些温暖的拥抱和笑容</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-rose-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">表达深藏情感</h4>
                                            <p className="text-gray-600 text-sm">说出那些当面不好意思讲的情话</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-rose-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">规划美好未来</h4>
                                            <p className="text-gray-600 text-sm">一起写下属于我们的愿望清单</p>
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
                                <div className="bg-rose-500 rounded-md w-10 h-10 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">❤️</span>
                                </div>
                                <h2 className="ml-3 text-xl font-bold">澄心<span className="text-rose-400">相印</span></h2>
                            </div>
                            <p className="text-gray-400 mb-6">
                                记录我们爱情的点点滴滴，让美好永不褪色
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
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
                            <h3 className="text-lg font-semibold mb-6">我们的空间</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-white">心动日记</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">回忆相册</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">情书信箱</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">恋爱地图</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">未来计划</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">关于我们</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-white">我们的故事</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">爱情誓言</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">共同目标</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">私密笔记</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">爱的留言</h3>
                            <p className="text-gray-400 mb-4">给彼此写下甜蜜的留言</p>
                            <form className="flex">
                                <input
                                    type="text"
                                    placeholder="写下你的悄悄话..."
                                    className="px-4 py-2 bg-gray-800 text-white rounded-l flex-grow focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-rose-500 px-4 py-2 rounded-r hover:bg-rose-600 transition"
                                >
                                    →
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400">© {new Date().getFullYear()} 澄心相印. 仅属于我们的空间.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white">私密协议</a>
                            <a href="#" className="text-gray-400 hover:text-white">爱情宣言</a>
                            <a href="#" className="text-gray-400 hover:text-white">永恒誓言</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
