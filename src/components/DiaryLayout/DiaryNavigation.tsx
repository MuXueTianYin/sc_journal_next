import Link from 'next/link';
import {Diary} from "@/utils/content/utils";


interface DiaryNavigationProps {
    diaries: Diary[];
    currentId?: string;
}

const DiaryNavigation: React.FC<DiaryNavigationProps> = ({ diaries, currentId }) => {
    return (
        <nav>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="搜索日记..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>

            <div className="space-y-3">
                {diaries.map((diary) => (
                    <Link
                        key={diary.id}
                        href={`/diaries/${diary.id}`}
                        className={`block p-4 rounded-xl transition-all ${
                            currentId === diary.id
                                ? 'bg-pink-100 dark:bg-pink-900/30 border border-pink-300 dark:border-pink-700'
                                : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                        }`}
                    >
                        <h3 className={`font-medium ${
                            currentId === diary.id
                                ? 'text-pink-700 dark:text-pink-300'
                                : 'text-gray-800 dark:text-gray-200'
                        }`}>
                            {diary.title}
                        </h3>
                        <div className="text-sm mt-1 flex items-center">
              <span className="text-gray-500 dark:text-gray-400">
                {/*{format(new Date(diary.date), 'yyyy年MM月dd日', { locale: zhCN })}*/}
              </span>
                            <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                            <span className="text-pink-500">
                {/*{diary.excerpt.slice(0, 20)}...*/}
              </span>
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default DiaryNavigation;
