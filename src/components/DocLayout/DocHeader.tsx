'use client';
import React, {useState} from 'react';
import UserMenu from './UserMenu';
import {Button} from "@/components/ui/button";
import {Search, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {SidebarTrigger} from "@/components/ui/sidebar";
import Link from "next/link";

interface DocHeaderProps {
    title: string;
}

const DocHeader: React.FC<DocHeaderProps> = ({
                                                 title,
                                             }) => {

    const [searchQuery, setSearchQuery] = useState<string>(''); // 修改为 string 类型
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    function onChange(query:string) {
        console.log('搜索内容变化' + query);
        setSearchQuery(query);
    }

    return (
        <>
            <header
                className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* 左侧：标题和菜单按钮 */}
                        <div className="flex items-center  justify-between">
                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    onClick={onMenuToggle}*/}
                            {/*    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-3"*/}
                            {/*>*/}
                            {/*    {showMobileMenu ? (*/}
                            {/*        <X className="h-6 w-6"/>*/}
                            {/*    ) : (*/}
                            {/*        <Menu className="h-6 w-6"/>*/}
                            {/*    )}*/}
                            {/*</button>*/}
                            <SidebarTrigger />
                            {/*<Link className="text-xl font-bold text-gray-900 dark:text-white" href={'/'}>首页</Link>*/}
                            <Link className="text-xl font-bold text-gray-900 dark:text-white" href={'/docs'}>{title}</Link>
                        </div>

                        {/* 中间：搜索框（桌面端） */}
                        <div className="md:flex flex-1 max-w-lg mx-8">
                            <div
                                className="relative w-full cursor-pointer flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 px-2 py-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >

                                {/*<Search className="h-5 w-5 mr-2"/>*/}
                                {/*<span className="text-sm">搜索文档...</span>*/}
                                {/*<div className="ml-auto flex items-center">*/}
                                {/*    <kbd*/}
                                {/*        className="text-xs bg-gray-200 dark:bg-gray-700 rounded px-1.5 py-0.5">⌘K</kbd>*/}
                                {/*</div>*/}
                                <Search className="h-5 w-5 mr-2"/>
                                <Input
                                    // ref={inputRef}
                                    placeholder="搜索日记、标签或日期..."
                                    className="flex-1 border-none focus-visible:ring-0 shadow-none pl-2 text-base"
                                    value={searchQuery}
                                    onChange={(e) => onChange(e.target.value)}
                                    // onFocus={handleFocus}
                                    // onBlur={handleBlur}
                                    aria-label="搜索输入框"
                                />
                            </div>
                        </div>

                        {/* 右侧：用户菜单和搜索按钮（移动端） */}
                        <div className="flex items-center">
                            {/*<Button*/}
                            {/*    variant="ghost"*/}
                            {/*    size="icon"*/}
                            {/*    className="md:hidden text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"*/}
                            {/*    onClick={() => setIsSearchOpen(true)}*/}
                            {/*>*/}
                            {/*    <Search className="h-5 w-5"/>*/}
                            {/*</Button>*/}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                onClick={() => setIsUserMenuOpen(true)}
                            >
                                <User className="h-5 w-5"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            {/* 用户菜单 */}
            <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)}/>
        </>
    );
};

export default DocHeader;
