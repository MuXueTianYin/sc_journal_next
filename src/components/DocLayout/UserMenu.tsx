import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, Heart, BookOpen } from 'lucide-react';
import {notMobile} from "@/utils/responsiveUtils";

interface UserMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose }) => {

    return (
        <>
            {/* 桌面端使用下拉菜单 */}
            {/*{notMobile() && (<div className="md:block">*/}
            {/*    <DropdownMenu open={isOpen} onOpenChange={onClose}>*/}
            {/*        <DropdownMenuTrigger asChild>*/}
            {/*            <Button*/}
            {/*                variant="ghost"*/}
            {/*                className="rounded-full h-10 w-10 bg-gray-100 dark:bg-gray-800"*/}
            {/*            >*/}
            {/*                <User className="h-5 w-5"/>*/}
            {/*            </Button>*/}
            {/*        </DropdownMenuTrigger>*/}
            {/*        <DropdownMenuContent className="w-56 mt-2" align="end">*/}
            {/*            <DropdownMenuLabel className="font-normal">*/}
            {/*                <div className="flex flex-col space-y-1">*/}
            {/*                    <p className="text-sm font-medium leading-none">甜蜜恋人</p>*/}
            {/*                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">*/}
            {/*                        lover@example.com*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            </DropdownMenuLabel>*/}
            {/*            <DropdownMenuSeparator/>*/}
            {/*            <DropdownMenuItem className="cursor-pointer">*/}
            {/*                <BookOpen className="mr-2 h-4 w-4 text-pink-500"/>*/}
            {/*                <span>我的日记</span>*/}
            {/*            </DropdownMenuItem>*/}
            {/*            <DropdownMenuItem className="cursor-pointer">*/}
            {/*                <Heart className="mr-2 h-4 w-4 text-pink-500"/>*/}
            {/*                <span>特别收藏</span>*/}
            {/*            </DropdownMenuItem>*/}
            {/*            <DropdownMenuItem className="cursor-pointer">*/}
            {/*                <Settings className="mr-2 h-4 w-4"/>*/}
            {/*                <span>账户设置</span>*/}
            {/*            </DropdownMenuItem>*/}
            {/*            <DropdownMenuSeparator/>*/}
            {/*            <DropdownMenuItem className="cursor-pointer text-red-500 hover:!text-red-600">*/}
            {/*                <LogOut className="mr-2 h-4 w-4"/>*/}
            {/*                <span>退出登录</span>*/}
            {/*            </DropdownMenuItem>*/}
            {/*        </DropdownMenuContent>*/}
            {/*    </DropdownMenu>*/}
            {/*</div>)}*/}


            {/* 移动端使用对话框 */}

            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-xs p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-4">
                        <DialogTitle className="sr-only">用户菜单</DialogTitle>
                        <div className="flex flex-col items-center">
                            <div
                                className="bg-pink-100 dark:bg-pink-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <User className="h-8 w-8 text-pink-600 dark:text-pink-400"/>
                            </div>
                            <h3 className="text-lg font-semibold">甜蜜恋人</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                lover@example.com
                            </p>
                        </div>
                    </DialogHeader>

                    <div className="px-3 pb-4">
                        <div className="space-y-1">
                            <button
                                className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <BookOpen className="mr-3 h-5 w-5 text-pink-500"/>
                                <span>我的日记</span>
                            </button>
                            <button
                                className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Heart className="mr-3 h-5 w-5 text-pink-500"/>
                                <span>特别收藏</span>
                            </button>
                            <button
                                className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Settings className="mr-3 h-5 w-5"/>
                                <span>账户设置</span>
                            </button>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                            <button
                                className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <LogOut className="mr-3 h-5 w-5" />
                                <span>退出登录</span>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserMenu;
