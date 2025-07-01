import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Image from "next/image";


interface Post {
    id: number;
    username: string;
    title: string;
    content?: string;
    likes: number;
    comments: number;
    tags?: string[];
    coverColor: string;
    imageUrl: string;
}

export default function PostCard({post}: { post: Post }) {
    return (
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
            {/* 封面图片 */}
            {/*<div className={`h-48 relative ${post.coverColor}`}>*/}
            {/*    <Image*/}
            {/*        src={post.imageUrl}*/}
            {/*        alt={post.title}*/}
            {/*        layout="fill"*/}
            {/*        objectFit="contain"*/}
            {/*        className="w-full h-full object-cover"*/}
            {/*        quality={75}*/}
            {/*        placeholder="blur"*/}
            {/*        blurDataURL="/assets/placeholder.png"*/}
            {/*    />*/}
            {/*    /!*<div className="absolute top-2 right-2">*!/*/}
            {/*    /!*    <button className="bg-white/80 backdrop-blur-sm h-8 w-8 rounded-full flex items-center justify-center">*!/*/}
            {/*    /!*        <Heart className="text-red-500 w-4 h-4" />*!/*/}
            {/*    /!*    </button>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
            {/* 紧凑型图片区域 - 高度减小30% */}
            <div className="relative aspect-[1.15]">
                {post.imageUrl ? (
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 334px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect width='10' height='10' fill='%23f0f0f0'/%3E%3C/svg%3E"
                    />
                ) : (
                    <div
                        className="w-full h-full bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center p-2">
            <span className="text-sm font-medium text-gray-600 px-4 text-center line-clamp-3">
              {post.title}
            </span>
                    </div>
                )}
            </div>

            {/*<div className="relative aspect-[4/5]">*/}
            {/*    {post.imageUrl ? (*/}
            {/*        <Image*/}
            {/*            src={post.imageUrl}*/}
            {/*            alt={post.title}*/}
            {/*            fill*/}
            {/*            className="object-cover"*/}
            {/*            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"*/}
            {/*            placeholder="blur"*/}
            {/*            blurDataURL={`data:image/svg+xml;base64,${btoa(*/}
            {/*                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" preserveAspectRatio="none">*/}
            {/*    <rect width="10" height="10" fill="${post.coverColor?.replace('bg-', '') || '#f9f9f9'}"/>*/}
            {/*  </svg>`*/}
            {/*            )}`}*/}
            {/*        />*/}
            {/*    ) : (*/}
            {/*        <div className={cn(*/}
            {/*            "w-full h-full flex items-center justify-center",*/}
            {/*            post.coverColor || "bg-gradient-to-r from-pink-100 to-purple-100"*/}
            {/*        )}>*/}
            {/*<span className="text-lg font-bold text-gray-700 px-4 text-center">*/}
            {/*  {post.title}*/}
            {/*</span>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}


            {/* 内容区 */}
            <CardContent className="p-4">
                <CardHeader className="p-0 pb-2">
                    <h3 className="font-bold text-base line-clamp-2">{post.title}</h3>
                </CardHeader>

                {
                    post.content && (
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2 whitespace-pre-line">
                            {post.content}
                        </p>
                    )
                }

                {/*    <div className="flex items-center mt-3">*/
                }
                {/*        /!* 用户信息 *!/*/
                }
                {/*        <div className="flex items-center">*/
                }
                {/*            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-xs">*/
                }
                {/*                {post.username.charAt(0)}*/
                }
                {/*            </div>*/
                }
                {/*            <span className="ml-2 text-sm text-gray-500">*/
                }
                {/*  {post.username}*/
                }
                {/*</span>*/
                }
                {/*        </div>*/
                }

                {/*        /!* 互动数据 *!/*/
                }
                {/*        <div className="flex items-center ml-auto text-gray-400">*/
                }
                {/*            <Heart className="w-4 h-4" />*/
                }
                {/*            <span className="ml-1 text-xs">{post.likes}</span>*/
                }
                {/*            <MessageSquare className="w-4 h-4 ml-3" />*/
                }
                {/*            <span className="ml-1 text-xs">{post.comments}</span>*/
                }
                {/*        </div>*/
                }
                {/*    </div>*/
                }

                {/*标签*/}
                {
                    post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500"
                                >
                #{tag}
              </span>
                            ))}
                        </div>
                    )
                }
            </CardContent>
        </Card>
    )
        ;
}
