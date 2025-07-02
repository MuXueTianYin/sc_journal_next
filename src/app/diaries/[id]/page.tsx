import {getAllDiaries, getDiaryById} from "@/utils/content/utils";
import DiaryLayout from "@/components/DiaryLayout/DiaryLayout";
import DiaryContent from "@/components/DiaryLayout/DiaryContent";


interface DiaryPageProps {
    params: {
        id: string;
    };
}

export async function generateStaticParams() {
    const diaries = getAllDiaries();
    return diaries.map(diary => ({
        id: diary.id,
    }));
}

export default async function DiaryPage({ params }: DiaryPageProps) {
    const diary = await getDiaryById(params.id);
    const diaries = getAllDiaries();

    return (
        <DiaryLayout diaries={diaries} currentDiary={diary}>
            <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                    {diary.title}
                </h1>

                <DiaryContent content={diary.content} date={diary.date} />

                {/* 文章目录 - 移动端 */}
                {diary.headings && diary.headings.length > 0 && (
                    <div className="md:hidden mt-12">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">本文目录</h3>
                            {/*<TableOfContents headings={diary.headings} />*/}
                        </div>
                    </div>
                )}

                <div className="mt-12 flex justify-between">
                    <div className="text-pink-500 font-medium">
                        ❤ 爱情永不褪色
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        记录于 {new Date(diary.date).toLocaleDateString('zh-CN')}
                    </div>
                </div>
            </div>
        </DiaryLayout>
    );
}
