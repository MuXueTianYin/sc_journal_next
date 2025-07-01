"use client"

import Head from 'next/head';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [daysInLove, setDaysInLove] = useState(0);
    const [hoursInLove, setHoursInLove] = useState(0);
    const [minutesInLove, setMinutesInLove] = useState(0);
    const [loveNote, setLoveNote] = useState('');
    const [loveNotes, setLoveNotes] = useState<string[]>([]);

    // 设置恋爱开始日期 - 2025年5月24日
    // const loveStartDate = new Date(2025, 4, 24); // 注意：月份是从0开始的，所以5月是4

    useEffect(() => {
        // 1. 创建起始时间（2025-05-24 UTC）
        const loveStartDate = new Date(Date.UTC(2025, 4, 24));

        const calculateLoveTime = () => {
            // 2. 获取当前UTC时间戳
            const nowUTC = Date.now();

            // 3. 计算毫秒差
            const diffMs = nowUTC - loveStartDate.getTime();

            // 4. 精准计算时间（一次性推导）
            // const totalSeconds = Math.floor(diffMs / 1000);

            const days = diffMs / (1000 * 60 * 60 * 24); // ≈38.23天
            const hours = days * 24;
            const minutes = hours * 60;
            setDaysInLove(Math.floor(days));
            setHoursInLove(Math.floor(hours));
            setMinutesInLove(Math.floor(minutes));
        };

        calculateLoveTime();
        // 每秒更新保证实时性
        const timer = setInterval(calculateLoveTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // 添加爱的留言
    const handleAddLoveNote = () => {
        if (loveNote.trim()) {
            setLoveNotes([...loveNotes, loveNote]);
            setLoveNote('');
        }
    };

    // 爱情里程碑数据
    const milestones = [
        {
            date: '2025年4月26日',
            title: '初遇',
            description: '阴差阳错的一起听，开启了我们奇妙的缘分',
            icon: '🎧'
        },
        {
            date: '2025年5月17日',
            title: '香港初会',
            description: '命运安排我们再次相遇，在喧闹的街头听见心跳',
            icon: '🇭🇰'
        },
        {
            date: '2025年5月24日',
            title: '深圳定情',
            description: '宝安摩天轮下的日落，牵起的手再也不愿放开',
            icon: '🎡'
        },
        {
            date: '2025年6月5日',
            title: '深夜陪伴',
            description: '陪你复习到凌晨两点，看到你努力的样子',
            icon: '📚'
        },
        {
            date: '2025年6月11日',
            title: '考试后的约会',
            description: '互相收到对方的小惊喜，一起拍了很多照片，进行了烛光晚餐，还去了迪士尼',
            icon: '📚'
        },
        {
            date: '2025年6月15日',
            title: '第一次小矛盾',
            description: '抖音的小误会让我们更懂得沟通的重要',
            icon: '💬'
        },
        {
            date: '未来',
            title: '永恒计划',
            description: '一起规划属于我们的美好未来',
            icon: '✨'
        }
    ];

    // 爱情数据统计
    const stats = [
        { label: '相恋天数', value: daysInLove },
        { label: '想你次数', value: '∞' },
        { label: '心动时刻', value: 100 },
        { label: '未来计划', value: '永远' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
            <Head>
                <title>澄心相印 | 我们的爱情日志</title>
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
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">恋爱日记</a>
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">甜蜜相册</a>
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">情书信箱</a>
                            <a href="#" className="text-gray-600 hover:text-rose-500 font-medium">恋爱地图</a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button
                                className="bg-rose-500 hover:bg-rose-600 text-white"
                                onClick={() => router.push('/docs')}
                            >
                                写新日记 →
                            </Button>
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
                            <span className="text-rose-500 font-medium">今日恋爱小贴士：爱是相互理解与包容</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                            我们的恋爱旅程已持续 <span className="text-rose-500">{daysInLove}</span> 天
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            从相遇的那天起，到香港重逢的惊喜，再到深圳定情的浪漫
                        </p>

                        <div className="flex justify-center space-x-4">
                            <Button
                                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg"
                                onClick={() => router.push('/discovery_feed')}
                            >
                                记录今日心动 →
                            </Button>
                            <Button
                                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg"
                                variant="outline"
                            >
                                查看甜蜜相册
                            </Button>
                        </div>
                    </div>
                </section>

                {/* 恋爱时间统计 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <Card className="bg-white rounded-2xl shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center text-gray-800">
                                我们的恋爱时间
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="p-6">
                                    <div className="text-6xl font-bold text-rose-500 mb-2">{daysInLove}</div>
                                    <div className="text-xl text-gray-600">相恋天数</div>
                                    <div className="text-sm text-gray-500 mt-2">从2025年5月24日开始</div>
                                </div>

                                <div className="p-6">
                                    <div className="text-6xl font-bold text-rose-500 mb-2">{hoursInLove}</div>
                                    <div className="text-xl text-gray-600">相爱小时</div>
                                    <div className="text-sm text-gray-500 mt-2">每一小时都值得珍惜</div>
                                </div>

                                <div className="p-6">
                                    <div className="text-6xl font-bold text-rose-500 mb-2">{minutesInLove}</div>
                                    <div className="text-xl text-gray-600">心动分钟</div>
                                    <div className="text-sm text-gray-500 mt-2">每分钟都在创造回忆</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* 爱情里程碑 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="flex justify-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800">爱情里程碑</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {milestones.map((milestone, index) => (
                            <Card key={index} className="feature-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <CardHeader>
                                    <div className="flex items-center">
                                        <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mr-4">
                                            <span className="text-3xl">{milestone.icon}</span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-bold text-gray-800">{milestone.title}</CardTitle>
                                            <p className="text-rose-500">{milestone.date}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{milestone.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* 爱的留言板 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <Card className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl overflow-hidden">
                        <div className="bg-white rounded-[22px] p-12">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">爱的留言板</h2>

                                <div className="mb-8">
                                    <Label htmlFor="love-note" className="block text-lg font-medium text-gray-700 mb-2">
                                        给澄澄的悄悄话：
                                    </Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="love-note"
                                            type="text"
                                            value={loveNote}
                                            onChange={(e) => setLoveNote(e.target.value)}
                                            placeholder="写下你的思念和爱意..."
                                            className="flex-grow"
                                        />
                                        <Button
                                            className="bg-rose-500 hover:bg-rose-600 text-white"
                                            onClick={handleAddLoveNote}
                                        >
                                            发送
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {loveNotes.length > 0 ? (
                                        loveNotes.map((note, index) => (
                                            <div key={index} className="bg-rose-50 rounded-lg p-4 border border-rose-100">
                                                <div className="flex items-start">
                                                    <div className="bg-rose-500 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                                        <span className="text-white">❤️</span>
                                                    </div>
                                                    <p className="text-gray-700">{note}</p>
                                                </div>
                                                <p className="text-right text-sm text-gray-500 mt-2">刚刚</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>还没有留言，写下你的第一句情话吧...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* 爱情数据统计 */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="flex justify-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800">我们的爱情数据</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                                <div className="text-5xl font-bold text-rose-500 mb-2">{stat.value}</div>
                                <div className="text-gray-600 text-lg">{stat.label}</div>
                            </Card>
                        ))}
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
                                <li><a href="#" className="text-gray-400 hover:text-white">恋爱日记</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">甜蜜相册</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">情书信箱</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">恋爱地图</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">未来计划</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">特别纪念</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-white">初遇纪念</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">定情时刻</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">第一次约会</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">共同旅行</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">爱的宣言</h3>
                            <p className="text-gray-400 mb-4 italic">
                                你最可爱，我说时来不及思索，但思索之后，还是这样说。
                            </p>
                            <p className="text-gray-400 italic">
                                愿我们携手走过每一个明天，直到永远。
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400">© {new Date().getFullYear()} 澄心相印. 仅属于我们的空间.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white">私密协议</a>
                            <a href="#" className="text-gray-400 hover:text-white">永恒誓言</a>
                            <a href="#" className="text-gray-400 hover:text-white">爱的承诺</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
