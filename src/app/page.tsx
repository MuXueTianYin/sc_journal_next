"use client";

import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [daysInLove, setDaysInLove] = useState(0);
  const [hoursInLove, setHoursInLove] = useState(0);
  const [minutesInLove, setMinutesInLove] = useState(0);
  const [loveNote, setLoveNote] = useState('');
  const [loveNotes, setLoveNotes] = useState<string[]>([]);

  useEffect(() => {
    const loveStartDate = new Date(Date.UTC(2025, 4, 24));

    const calculateLoveTime = () => {
      const nowUTC = Date.now();
      const diffMs = nowUTC - loveStartDate.getTime();
      const days = diffMs / (1000 * 60 * 60 * 24);
      const hours = days * 24;
      const minutes = hours * 60;
      setDaysInLove(Math.floor(days));
      setHoursInLove(Math.floor(hours));
      setMinutesInLove(Math.floor(minutes));
    };

    calculateLoveTime();
    const timer = setInterval(calculateLoveTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddLoveNote = () => {
    if (loveNote.trim()) {
      setLoveNotes([...loveNotes, loveNote]);
      setLoveNote('');
    }
  };

  const milestones = [
    { date: '2025年4月26日', title: '初见', description: '阴差阳错的一起听，开启了我们奇妙的缘分', icon: '🎧' },
    { date: '2025年5月17日', title: '再遇', description: '命运安排我们再次相遇，在喧闹的街头听见心跳', icon: '🇭🇰' },
    { date: '2025年5月24日', title: '确定', description: '宝安摩天轮下的日落，牵起的手再也不愿放开', icon: '🎡' },
    { date: '2025年6月5日', title: '陪伴', description: '陪你复习到凌晨两点，看到你努力的样子', icon: '📚' },
    { date: '2025年6月11日', title: '同行', description: '互相收到对方的小惊喜，一起拍了很多照片，进行了烛光晚餐，还去了迪士尼', icon: '📷' },
    { date: '2025年6月15日', title: '理解', description: '一次小误会，让我们更懂得沟通的重要', icon: '💬' },
    { date: '未来', title: '未完待续', description: '一起规划属于我们的美好未来', icon: '✨' },
  ];

  const stats = [
    { label: '相伴天数', value: daysInLove },
    { label: '收藏片段', value: '∞' },
    { label: '留存瞬间', value: 100 },
    { label: '未完待续', value: '永远' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <Head>
        <title>澄心·时光纪念册</title>
        <meta name="description" content="把值得记住的日子，轻轻整理成册。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="fixed z-10 w-full bg-white/80 shadow-sm backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-rose-500">
                <span className="text-xl font-bold text-white">❤️</span>
              </div>
              <div className="ml-3 min-w-0">
                <h1 className="truncate text-xl font-bold text-gray-800">
                  澄心<span className="text-rose-500">·时光纪念册</span>
                </h1>
                <p className="hidden text-xs text-gray-500 sm:block">章节目录 · 留影集 · 时光年表</p>
              </div>
            </div>

            <div className="hidden max-w-xl flex-1 items-center justify-end gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide md:flex lg:max-w-none lg:flex-wrap lg:justify-center">
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/">
                封面
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/diaries">
                章节
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/discovery_feed">
                留影集
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/heart_tree">
                心形树
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/album_3d">
                立体相册
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/love_letter">
                情书
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/starry_night">
                星空
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/valentine">
                趣味表白
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/countdown">
                倒计时
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/flipbook">
                翻页册
              </Link>
              <Link className="font-medium text-gray-600 hover:text-rose-500" href="/gift">
                神秘礼物
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button className="hidden bg-rose-500 text-white hover:bg-rose-600 sm:inline-flex" onClick={() => router.push('/diaries')}>
                写下这一章
              </Button>
              <Button className="bg-rose-500 px-3 text-white hover:bg-rose-600 sm:hidden" onClick={() => router.push('/diaries')}>
                章节
              </Button>
              <Button variant="outline" className="border-rose-200 bg-white px-3 text-rose-600 hover:bg-rose-50 sm:hidden" onClick={() => router.push('/discovery_feed')}>
                留影
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-16 pt-24">
        <section className="mx-auto mb-20 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-rose-100 bg-rose-50 px-4 py-1">
              <span className="mr-2 h-2 w-2 rounded-full bg-rose-500" />
              <span className="font-medium text-rose-500">今日纪念小贴士：把普通日子过成值得回看的章节</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-800 md:text-5xl lg:text-6xl">
              相伴已过 <span className="text-rose-500">{daysInLove}</span> 天
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600">
              这里是属于我们的时光纪念册，章节、留影和年表都被安静地整理在这里。
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Button className="bg-rose-500 px-8 py-6 text-lg text-white hover:bg-rose-600" onClick={() => router.push('/diaries')}>
                翻阅章节 →
              </Button>
              <Button className="border border-gray-300 bg-white px-8 py-6 text-lg text-gray-700 hover:bg-gray-50" variant="outline" onClick={() => router.push('/discovery_feed')}>
                查看留影集
              </Button>
              <Button className="border border-rose-200 bg-white px-8 py-6 text-lg text-rose-600 hover:bg-rose-50" variant="outline" onClick={() => router.push('/heart_tree')}>
                心形树
              </Button>
              <Button className="border border-rose-200 bg-white px-8 py-6 text-lg text-rose-600 hover:bg-rose-50" variant="outline" onClick={() => router.push('/album_3d')}>
                立体相册
              </Button>
              <Button className="border border-rose-200 bg-white px-6 py-6 text-lg text-rose-600 hover:bg-rose-50" variant="outline" onClick={() => router.push('/love_letter')}>
                情书
              </Button>
              <Button className="border border-rose-200 bg-white px-6 py-6 text-lg text-rose-600 hover:bg-rose-50" variant="outline" onClick={() => router.push('/starry_night')}>
                星空
              </Button>
              <Button className="border border-rose-200 bg-white px-6 py-6 text-lg text-rose-600 hover:bg-rose-50" variant="outline" onClick={() => router.push('/valentine')}>
                趣味表白
              </Button>
              <Button className="border border-rose-200 bg-white px-6 py-6 text-lg text-rose-600 hover:bg-rose-50" variant="outline" onClick={() => router.push('/countdown')}>
                倒计时
              </Button>
              <Button className="border border-rose-200 bg-white px-6 py-6 text-lg text-rose-600 hover:bg-rose-50" variant="outline" onClick={() => router.push('/flipbook')}>
                翻页册
              </Button>
              <Button className="border border-rose-200 bg-white px-6 py-6 text-lg text-rose-600 hover:bg-rose-50" variant="outline" onClick={() => router.push('/gift')}>
                神秘礼物
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="rounded-2xl bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-gray-800">时光统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                <div className="p-6">
                  <div className="mb-2 text-6xl font-bold text-rose-500">{daysInLove}</div>
                  <div className="text-xl text-gray-600">天</div>
                  <div className="mt-2 text-sm text-gray-500">从 2025 年 5 月 24 日开始</div>
                </div>
                <div className="p-6">
                  <div className="mb-2 text-6xl font-bold text-rose-500">{hoursInLove}</div>
                  <div className="text-xl text-gray-600">小时</div>
                  <div className="mt-2 text-sm text-gray-500">每一小时都值得被记住</div>
                </div>
                <div className="p-6">
                  <div className="mb-2 text-6xl font-bold text-rose-500">{minutesInLove}</div>
                  <div className="text-xl text-gray-600">分钟</div>
                  <div className="mt-2 text-sm text-gray-500">每一分钟都在留下痕迹</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex justify-center">
            <h2 className="text-3xl font-bold text-gray-800">关键章节</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone, index) => (
              <Card key={index} className="feature-card overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
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

        <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-pink-600">
            <div className="rounded-[22px] bg-white p-8 sm:p-12">
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">留言角</h2>

                <div className="mb-8">
                  <Label htmlFor="love-note" className="mb-2 block text-lg font-medium text-gray-700">
                    写下一句想保留的话：
                  </Label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      id="love-note"
                      type="text"
                      value={loveNote}
                      onChange={(e) => setLoveNote(e.target.value)}
                      placeholder="写下今天的心情..."
                      className="flex-grow"
                    />
                    <Button className="bg-rose-500 text-white hover:bg-rose-600" onClick={handleAddLoveNote}>
                      发送
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {loveNotes.length > 0 ? (
                    loveNotes.map((note, index) => (
                      <div key={index} className="rounded-lg border border-rose-100 bg-rose-50 p-4">
                        <div className="flex items-start">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500">
                            <span className="text-white">❤️</span>
                          </div>
                          <p className="text-gray-700">{note}</p>
                        </div>
                        <p className="mt-2 text-right text-sm text-gray-500">刚刚</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      <p>这一页还空着，先轻轻留下一点心情吧。</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex justify-center">
            <h2 className="text-3xl font-bold text-gray-800">我们的时光统计</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mb-2 text-5xl font-bold text-rose-500">{stat.value}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-rose-500">
                  <span className="text-xl font-bold text-white">❤️</span>
                </div>
                <h2 className="ml-3 text-xl font-bold">
                  澄心<span className="text-rose-400">·时光纪念册</span>
                </h2>
              </div>
              <p className="mb-6 text-gray-400">把值得记住的日子，轻轻放进这里。</p>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">我们的空间</h3>
              <ul className="space-y-3">
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/diaries">
                    章节
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/discovery_feed">
                    留影集
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/heart_tree">
                    心形树
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/album_3d">
                    立体相册
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/love_letter">
                    情书
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/starry_night">
                    星空
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/valentine">
                    趣味表白
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/countdown">
                    倒计时
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/flipbook">
                    翻页册
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-white" href="/gift">
                    神秘礼物
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">特别章节</h3>
              <ul className="space-y-3 text-gray-400">
                <li>初见</li>
                <li>再遇</li>
                <li>同行</li>
                <li>未完待续</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">纪念宣言</h3>
              <p className="mb-4 italic text-gray-400">你最可爱，我说时来不及思索，但思索之后，还是这样说。</p>
              <p className="italic text-gray-400">愿我们携手走过每一个明天，直到永远。</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
            <p className="text-gray-400">© {new Date().getFullYear()} 澄心·时光纪念册</p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 md:mt-0 md:justify-end">
              <Link href="/diaries" className="text-gray-400 hover:text-white">章节</Link>
              <Link href="/discovery_feed" className="text-gray-400 hover:text-white">留影集</Link>
              <Link href="/heart_tree" className="text-gray-400 hover:text-white">心形树</Link>
              <Link href="/album_3d" className="text-gray-400 hover:text-white">立体相册</Link>
              <Link href="/love_letter" className="text-gray-400 hover:text-white">情书</Link>
              <Link href="/starry_night" className="text-gray-400 hover:text-white">星空</Link>
              <Link href="/valentine" className="text-gray-400 hover:text-white">趣味表白</Link>
              <Link href="/countdown" className="text-gray-400 hover:text-white">倒计时</Link>
              <Link href="/flipbook" className="text-gray-400 hover:text-white">翻页册</Link>
              <Link href="/gift" className="text-gray-400 hover:text-white">神秘礼物</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
