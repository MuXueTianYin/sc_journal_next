import React, {useEffect, useRef, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Search, X} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import useDebounce from '@/lib/hooks/useDebounce';
import {cn} from '@/lib/utils';
import {useResponsive} from "@/utils/responsiveUtils";


interface SearchResult {
    id: number;
    title: string;
    category: string;
    excerpt: string;
    date?: string;
}

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onResultClick: (result: SearchResult) => void;
    className?: string;
}

const mockSearch = async (query: string): Promise<SearchResult[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const allResults = [
        { id: 1, title: '第一次约会', category: '日记', excerpt: '那个春天，我们第一次正式约会，一切都那么美好而难忘...', date: '2025-04-10' },
        { id: 2, title: '恋爱一周年纪念日', category: '日记', excerpt: '一周年纪念日，我们回到初遇的地方，重温爱的誓言...', date: '2025-05-24' },
        { id: 3, title: '旅行日记 - 海边', category: '旅行', excerpt: '我们一起去看海，沙滩上留下我们的脚印...', date: '2025-06-15' },
        { id: 4, title: '一起做饭的夜晚', category: '生活', excerpt: '厨房里的烟火气，是我们爱情的调味料...', date: '2025-06-22' },
        { id: 5, title: '生日惊喜', category: '日记', excerpt: '准备了半个月的惊喜，终于在今天给了她...', date: '2025-07-01' },
    ];

    if (!query.trim()) return allResults;

    return allResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase())
    );
};

const SearchInput: React.FC<SearchInputProps> = ({
                                                     value,
                                                     onChange,
                                                     onResultClick,
                                                     className
                                                 }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedQuery = useDebounce(value, 300);
    const [expanded, setExpanded] = useState(false);
    const { isMobile } = useResponsive();

    const handleClear = () => {
        onChange('');
        if (inputRef.current) inputRef.current.focus();
    };

    const handleFocus = () => {
        if (isMobile) {
            setExpanded(true);
        }
    };

    const handleBlur = () => {
        // 添加延迟确保点击结果前不会关闭
        setTimeout(() => {
            if (isMobile && !value) {
                setExpanded(false);
            }
        }, 200);
    };

    // 搜索效果
    useEffect(() => {
        const performSearch = async () => {
            setIsLoading(true);
            try {
                const results = await mockSearch(debouncedQuery);
                setSearchResults(results);
            } catch (error) {
                console.error('搜索失败:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (debouncedQuery.trim() || expanded) {
            performSearch();
        }
    }, [debouncedQuery, expanded]);

    useEffect(() => {
        if (!expanded && value) {
            setExpanded(true);
        }
    }, [value]);

    // 点击外部关闭结果区域
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isMobile && expanded && inputRef.current &&
                !inputRef.current.contains(e.target as Node)) {
                setExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobile, expanded]);

    // 键盘快捷键处理
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setExpanded(!expanded);
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }

            if (e.key === 'Escape') {
                setExpanded(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [expanded]);

    return (
        <div className={cn(
            "relative z-50",
            className,
            isMobile ? "w-full" : "w-80"
        )}>
            {/* 移动端折叠状态 */}
            {isMobile && !expanded && (
                <button
                    onClick={() => {
                        setExpanded(true);
                        setTimeout(() => inputRef.current?.focus(), 10);
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                    aria-label="打开搜索"
                >
                    <Search className="text-gray-600" size={20} />
                </button>
            )}

            {/* 搜索框区域 - 桌面端或移动端展开状态 */}
            {(expanded || !isMobile) && (
                <div className={cn(
                    "bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden",
                    {"w-full": isMobile}
                )}>
                    <div className="relative flex items-center px-3 py-2">
                        <Search className="text-gray-500 ml-1" size={20} />

                        <Input
                            ref={inputRef}
                            placeholder="搜索日记、标签或日期..."
                            className="flex-1 border-none focus-visible:ring-0 shadow-none pl-2 text-base"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            aria-label="搜索输入框"
                        />

                        {value && (
                            <button
                                onClick={handleClear}
                                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                aria-label="清除搜索"
                            >
                                <X size={18} />
                            </button>
                        )}

                        {isMobile && (
                            <button
                                onClick={() => setExpanded(false)}
                                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 px-3 py-1 rounded"
                            >
                                取消
                            </button>
                        )}
                    </div>

                    {/* 搜索结果区域 */}
                    {expanded && (
                        <div className={cn(
                            "max-h-[60vh] overflow-y-auto border-t",
                            isMobile ? "max-h-[70vh]" : "max-h-96"
                        )}>
                            {isLoading ? (
                                <div className="py-6 flex flex-col items-center justify-center">
                                    <div className="relative w-10 h-10">
                                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
                                    </div>
                                    <p className="mt-3 text-gray-500">搜索中...</p>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="divide-y">
                                    {searchResults.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => {
                                                onResultClick(item);
                                                if (isMobile) setExpanded(false);
                                            }}
                                        >
                                            <div className="flex items-start">
                                                <div className="bg-pink-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 mt-1">
                                                    <Search className="h-5 w-5 text-pink-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                                                        <Badge variant="outline" className="text-xs">
                                                            {item.category}
                                                        </Badge>
                                                        {item.date && (
                                                            <span className="text-xs text-gray-500 ml-auto">{item.date}</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {item.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : value ? (
                                <div className="py-8 text-center">
                                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">没有找到结果</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        尝试不同的搜索词或浏览所有日记
                                    </p>
                                </div>
                            ) : (
                                <div className="p-4">
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">最近搜索</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['纪念日', '旅行', '生日', '晚餐'].map((term, index) => (
                                            <button
                                                key={index}
                                                onClick={() => onChange(term)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                                                    "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                )}
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>

                                    <h3 className="text-sm font-medium text-gray-900 mt-4 mb-3">热门日记</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { title: '第一次见家长', date: '2025-04-15' },
                                            { title: '周末旅行计划', date: '2025-06-08' },
                                            { title: '周年纪念惊喜', date: '2025-05-24' },
                                            { title: '生日礼物创意', date: '2025-07-01' },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                                                onClick={() => onChange(item.title.split(' ')[0])}
                                            >
                                                <div className="flex items-center">
                                                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                                                        <Search className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.title}</p>
                                                        <p className="text-xs text-gray-500">{item.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
