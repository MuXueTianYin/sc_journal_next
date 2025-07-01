"use client";
import {useState, useRef} from "react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

// 新增回调接口类型
interface MainNavProps {
    items: { id: number; name: string }[];
    onCategoryChange?: (id: number) => void; // 分类变化回调
    onSearch?: (value: string) => void;      // 搜索回调
}

export default function MainNav(
    {
        items,
        onCategoryChange,
        onSearch
    }: MainNavProps
) {
    const [activeId, setActiveId] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (id: number) => {
        setActiveId(id);
        if (onCategoryChange) onCategoryChange(id);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) onSearch(searchValue);
    };

    // 滚动导航到中央位置（移动端优化）
    const scrollToCenter = (element: HTMLElement) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const elementLeft = element.offsetLeft;
        const elementWidth = element.offsetWidth;

        container.scrollTo({
            left: elementLeft - containerWidth / 2 + elementWidth / 2,
            behavior: "smooth"
        });
    };

    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-red-500"/>

                {/* 搜索框 */}
                <form onSubmit={handleSearch} className="flex-1">
                    <Input
                        type="text"
                        placeholder="输入并搜索...."
                        className="rounded-full bg-gray-100 focus-visible:ring-0"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>

                {/* 菜单按钮 */}
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                </div>
            </div>

            {/* 分类导航 - 水平滚动 */}
            <div
                ref={scrollContainerRef}
                className="mt-3 overflow-x-auto scrollbar-hide whitespace-nowrap"
            >
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={cn(
                            "px-3 py-1.5 mx-1 rounded-full text-sm transition-all duration-300",
                            activeId === item.id
                                ? "bg-black text-white shadow-md scale-[1.05]"
                                : "bg-gray-100 hover:bg-gray-200"
                        )}
                        onClick={(e) => {
                            handleItemClick(item.id);
                            scrollToCenter(e.currentTarget);
                        }}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </header>
    );
}
