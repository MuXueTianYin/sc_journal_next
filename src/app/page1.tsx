"use client"

import Head from "next/head"
import { useState, useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [daysCount, setDaysCount] = useState(0)
  const [hoursCount, setHoursCount] = useState(0)
  const [minutesCount, setMinutesCount] = useState(0)
  const [selfNote, setSelfNote] = useState("")
  const [selfNotes, setSelfNotes] = useState<string[]>([])

  // 设置一个重新开始的日期（2025年1月1日，象征新起点）
  useEffect(() => {
    const startDate = new Date(Date.UTC(2025, 0, 1)) // 2025年1月1日

    const calculateTime = () => {
      const nowUTC = Date.now()
      const diffMs = nowUTC - startDate.getTime()
      const days = diffMs / (1000 * 60 * 60 * 24)
      const hours = days * 24
      const minutes = hours * 60
      setDaysCount(Math.floor(days))
      setHoursCount(Math.floor(hours))
      setMinutesCount(Math.floor(minutes))
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAddSelfNote = () => {
    if (selfNote.trim()) {
      setSelfNotes([...selfNotes, selfNote])
      setSelfNote("")
    }
  }

  // 个人里程碑数据（替换恋爱里程碑）
  const milestones = [
    {
      date: "2025年1月1日",
      title: "重新出发",
      description: "决定把注意力收回到自己身上，开始记录生活的每一天",
      icon: "🌅",
    },
    {
      date: "2025年1月15日",
      title: "读完第一本书",
      description: "《被讨厌的勇气》—— 课题分离，学会接纳自己",
      icon: "📖",
    },
    {
      date: "2025年2月10日",
      title: "独自旅行",
      description: "一个人去了海边，看日出，听浪声，内心从未如此安静",
      icon: "🌊",
    },
    {
      date: "2025年3月5日",
      title: "学会新技能",
      description: "完成了一直想学的视频剪辑，做出了第一个作品",
      icon: "🎬",
    },
    {
      date: "2025年4月20日",
      title: "运动挑战",
      description: "连续30天晨跑，养成了早起的习惯",
      icon: "🏃",
    },
    {
      date: "2025年5月1日",
      title: "整理旧物",
      description: "把过去收进箱子，把房间布置成自己喜欢的样子",
      icon: "🧹",
    },
    {
      date: "未来",
      title: "无限可能",
      description: "继续成长，去体验更多未知的美好",
      icon: "✨",
    },
  ]

  // 个人数据统计
  const stats = [
    { label: "记录天数", value: daysCount },
    { label: "学会技能", value: 6 },
    { label: "阅读书籍", value: 12 },
    { label: "未来计划", value: "∞" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Head>
        <title>时光印记 | 我的成长日记</title>
        <meta name="description" content="记录自我成长与生活点滴的私密空间" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 导航栏 */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-indigo-500 rounded-md w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold text-xl">📅</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-800">
                时光<span className="text-indigo-500">印记</span>
              </h1>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
                首页
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
                日常随想
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
                生活掠影
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
                心情笔记
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
                足迹地图
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => router.push("/diaries")}
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
            <div className="inline-flex items-center bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100 mb-4">
              <span className="bg-indigo-500 h-2 w-2 rounded-full mr-2"></span>
              <span className="text-indigo-500 font-medium">
                今日寄语：好好爱自己，是终身浪漫的开始
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              认真生活的第 <span className="text-indigo-500">{daysCount}</span> 天
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              从重新出发的那天起，记录每一次成长，每一份安静的力量
            </p>

            <div className="flex justify-center space-x-4">
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-6 text-lg">
                记录今日心情 →
              </Button>
              <Button
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg"
                variant="outline"
                onClick={() => router.push("/discovery_feed")}
              >
                查看影像集
              </Button>
            </div>
          </div>
        </section>

        {/* 时间统计 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-gray-800">
                我的时间账簿
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <div className="text-6xl font-bold text-indigo-500 mb-2">{daysCount}</div>
                  <div className="text-xl text-gray-600">记录天数</div>
                  <div className="text-sm text-gray-500 mt-2">从2025年1月1日开始</div>
                </div>

                <div className="p-6">
                  <div className="text-6xl font-bold text-indigo-500 mb-2">{hoursCount}</div>
                  <div className="text-xl text-gray-600">小时积累</div>
                  <div className="text-sm text-gray-500 mt-2">每一刻都在塑造新的我</div>
                </div>

                <div className="p-6">
                  <div className="text-6xl font-bold text-indigo-500 mb-2">{minutesCount}</div>
                  <div className="text-xl text-gray-600">分钟沉淀</div>
                  <div className="text-sm text-gray-500 mt-2">时间看得见</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 个人里程碑 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex justify-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">成长里程碑</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <Card
                key={index}
                className="feature-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-3xl">{milestone.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {milestone.title}
                      </CardTitle>
                      <p className="text-indigo-500">{milestone.date}</p>
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

        {/* 心情留言板 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <Card className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl overflow-hidden">
            <div className="bg-white rounded-[22px] p-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">心情随笔</h2>

                <div className="mb-8">
                  <Label htmlFor="self-note" className="block text-lg font-medium text-gray-700 mb-2">
                    写给自己的话：
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="self-note"
                      type="text"
                      value={selfNote}
                      onChange={(e) => setSelfNote(e.target.value)}
                      placeholder="记录此刻的感受或鼓励..."
                      className="flex-grow"
                    />
                    <Button
                      className="bg-indigo-500 hover:bg-indigo-600 text-white"
                      onClick={handleAddSelfNote}
                    >
                      发送
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {selfNotes.length > 0 ? (
                    selfNotes.map((note, index) => (
                      <div key={index} className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                        <div className="flex items-start">
                          <div className="bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <span className="text-white">📝</span>
                          </div>
                          <p className="text-gray-700">{note}</p>
                        </div>
                        <p className="text-right text-sm text-gray-500 mt-2">刚刚</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>还没有留言，写下第一句送给自己吧...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 个人数据统计 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex justify-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">我的收获</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-5xl font-bold text-indigo-500 mb-2">{stat.value}</div>
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
                <div className="bg-indigo-500 rounded-md w-10 h-10 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">📅</span>
                </div>
                <h2 className="ml-3 text-xl font-bold">
                  时光<span className="text-indigo-400">印记</span>
                </h2>
              </div>
              <p className="text-gray-400 mb-6">记录成长的点点滴滴，让每一刻都有意义</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
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
              <h3 className="text-lg font-semibold mb-6">我的空间</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    日常随想
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    生活掠影
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    心情笔记
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    足迹地图
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    未来计划
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">特别纪念</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    重新出发日
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    第一次独自旅行
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    学会新技能
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    运动挑战成功
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">自我寄语</h3>
              <p className="text-gray-400 mb-4 italic">
                “无论过去如何，未来的每一天都属于我自己。”
              </p>
              <p className="text-gray-400 italic">“愿你成为自己的太阳，无需凭借谁的光。”</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} 时光印记. 仅属于我的成长空间.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                关于本站
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                隐私声明
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                自我约定
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}