"use client";
import PostCard from '@/components/layout/PostCard';
import MainNav from '@/components/layout/MainNav';
// import BottomNav from '@/components/layout/BottomNav';


const navItems = [
    {id: 1, name: "推荐"},
    {id: 2, name: "穿搭"},
    {id: 3, name: "美食"},
    {id: 4, name: "彩妆"},
    {id: 5, name: "影视"},
    {id: 6, name: "职场"},
];

// const posts = [
//     {
//         id: 1,
//         username: "momo",
//         title: "24年毕业的也是应届生啊",
//         content: `已读 18:55\n我没有交社保\n已读\n我问问人事\n还是按社招的\n...我24届还能投校招`,
//         likes: 143,
//         comments: 21,
//         tags: ["应届生", "求职"],
//         coverColor: "bg-gradient-to-r from-pink-100 to-purple-100",
//         imageUrl: "/assets/cc/IMG20250524180948.jpg",
//     },
//     {
//         id: 2,
//         username: "沈阳考证情报局",
//         title: "男生考证最新最全段位排行榜!202",
//         content: `2019考研\n分析\n男生考证最新最全段位排行榜!202\n5搞钱必看`,
//         likes: 1865,
//         comments: 245,
//         tags: ["考证", "段位榜"],
//         coverColor: "bg-gradient-to-r from-blue-100 to-cyan-100",
//         imageUrl: "/assets/cc/IMG_20250617_001231.jpg",
//     },
//     {
//         id: 3,
//         username: "momo",
//         title: "男友给我备注竟然是...气笑了",
//         content: `开通微信\n登录\n用户输入的内容无法进行下拉操作，无法进行实际文字输入。`,
//         likes: 8715,
//         comments: 1204,
//         tags: ["情感", "男友"],
//         coverColor: "bg-gradient-to-r from-purple-100 to-pink-100",
//         imageUrl: "/assets/cc/IMG_20250617_002505.jpg",
//
//     },
//     {
//         id: 4,
//         username: "厦门热心市民",
//         title: "开发一个这样的小程序大概多少预算能拿下",
//         likes: 61,
//         comments: 8,
//         tags: ["开发", "预算"],
//         coverColor: "bg-gradient-to-r from-yellow-100 to-orange-100",
//         imageUrl: "/assets/cc/IMG_20250620_092648.jpg",
//     },
// ];


const posts = [
    {
        id: 1,
        username: "momo",
        title: "和他相遇的第30天",
        content: `今天特意去了我们第一次约会的咖啡店，点了一模一样的拿铁。\n他在门口等我时偷偷系鞋带的样子，还是和那天一样可爱。\n#纪念日 #恋爱日常`,
        likes: 143,
        comments: 21,
        tags: ["恋爱日常", "情侣打卡"],
        coverColor: "bg-gradient-to-r from-pink-100 to-purple-100",
        imageUrl: "/assets/cc/IMG20250524180948.jpg",
    },
    {
        id: 2,
        username: "小红书情感局",
        title: "恋爱段位排行榜（真实版）",
        content: `青铜：会发早安\n白银：会记生日\n黄金：会送小礼物\n王者：会突然说“我爱你”\n#恋爱段位 #情侣日常`,
        likes: 1865,
        comments: 245,
        tags: ["恋爱段位", "情侣日常"],
        coverColor: "bg-gradient-to-r from-blue-100 to-cyan-100",
        imageUrl: "/assets/cc/IMG_20250617_001231.jpg",
    },
    {
        id: 3,
        username: "momo",
        title: "男友的微信备注让我哭笑不得",
        content: `他的备注是：“人间小甜豆（已过期）”。\n我问为什么加括号，他说：“因为你总嫌弃我发糖太晚。”\n#恋爱趣事 #男友日常`,
        likes: 8715,
        comments: 1204,
        tags: ["恋爱趣事", "男友日常"],
        coverColor: "bg-gradient-to-r from-purple-100 to-pink-100",
        imageUrl: "/assets/cc/IMG_20250617_002505.jpg",
    },
    {
        id: 4,
        username: "浪漫制造机",
        title: "开发一个“爱情盲盒”小程序",
        content: `每天随机生成一句情话，附带一张你们的照片。\n比如：“今天你的眼睛比上次更亮了～”\n#情侣开发 #创意礼物`,
        likes: 61,
        comments: 8,
        tags: ["情侣开发", "创意礼物"],
        coverColor: "bg-gradient-to-r from-yellow-100 to-orange-100",
        imageUrl: "/assets/cc/IMG_20250620_092648.jpg",
    },
    {
        id: 5,
        username: "心动实验室",
        title: "情侣专属“情绪翻译器”小程序",
        content: `输入“我想你了”，他会自动回复：“我在煮面，多加了个蛋。”\n#科技恋爱 #情侣日常`,
        likes: 61,
        comments: 8,
        tags: ["科技恋爱", "情侣日常"],
        coverColor: "bg-gradient-to-r from-yellow-100 to-orange-100",
        imageUrl: "/assets/cc/3F77F5AF_IMG_5670.jpg",
    },
    {
        id: 6,
        username: "恋爱脑研究所",
        title: "情侣必看的“吵架修复”小程序",
        content: `输入“你总是忽略我”，他会生成：“抱歉！我刚刚在想你发的那条朋友圈。”\n#恋爱技巧 #情侣日常`,
        likes: 61,
        comments: 8,
        tags: ["恋爱技巧", "情侣日常"],
        coverColor: "bg-gradient-to-r from-yellow-100 to-orange-100",
        imageUrl: "/assets/cc/IMG20250524191450.jpg",
    },
    {
        id: 7,
        username: "浪漫代码师",
        title: "用代码写的情书小程序",
        content: `点击按钮生成一行情话，比如：“你是我算法里的最优解。”\n#程序员恋爱 #创意表白`,
        likes: 61,
        comments: 8,
        tags: ["程序员恋爱", "创意表白"],
        coverColor: "bg-gradient-to-r from-yellow-100 to-orange-100",
        imageUrl: "/assets/cc/IMG20250614133856.jpg",
    },
    {
        id: 8,
        username: "恋爱灵感库",
        title: "情侣专属“旅行计划”小程序",
        content: `输入城市名称，自动生成情侣旅行打卡路线。\n比如：“巴黎：埃菲尔铁塔+塞纳河游船。”\n#情侣旅行 #浪漫计划`,
        likes: 61,
        comments: 8,
        tags: ["情侣旅行", "浪漫计划"],
        coverColor: "bg-gradient-to-r from-yellow-100 to-orange-100",
        imageUrl: "/assets/cc/IMG20250614164551.jpg",
    },
];



export default function DiscoveryFeed() {

    const handleCategoryChange = (categoryId: number) => {
        console.log("当前分类ID:", categoryId);
    };

    // 处理搜索
    const handleSearch = (searchTerm: string) => {
        console.log("搜索关键词:", searchTerm);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <MainNav
                items={navItems}
                onCategoryChange={handleCategoryChange}
                onSearch={handleSearch}
            />
            <main className="container mx-auto px-3 pb-16 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post}/>
                    ))}
                </div>
            </main>
            {/*<BottomNav />*/}
        </div>
    );
}
