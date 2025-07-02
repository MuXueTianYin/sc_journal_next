'use client';
import React, {useEffect, useState} from 'react';
import DocNav from './DocNav';
import DocHeader from './DocHeader';
import { Doc } from '@/lib/docs';
import {useResponsive} from "@/utils/responsiveUtils";


interface DocLayoutProps {
    children: React.ReactNode;
    docs: Doc[];
}

const DocLayout: React.FC<DocLayoutProps> = ({ children, docs }) => {
    const { isMobile, isTablet,isDesktop } = useResponsive();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(true);

    useEffect(() => {
        setMobileMenuOpen(isDesktop);
    }, []);

    function isMobileMl(){
        if(isMobile || isTablet)
            return 'ml-20'
        return ''
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 ">
            <DocHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} title={'sc回忆'} showMobileMenu={mobileMenuOpen}  />

            <div className="flex flex-1 w-full px-4 sm:px-6 lg:px-8">
                {/* 移动端导航菜单 */}
                {isMobile || isTablet  && (
                    <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
                        <div className="fixed inset-y-0 left-0 w-5/6 max-w-md bg-white z-50 overflow-y-auto">
                            <div className="p-4">
                                <DocNav docs={docs} onSelect={() => setMobileMenuOpen(false)} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-1 w-full">
                    {/* 桌面端左侧导航 */}
                    {mobileMenuOpen  &&
                        <aside className=" md:block w-64 lg:w-72 xl:w-80 py-6 pr-6">
                            <div className={"sticky top-24 h-[calc(100vh-64px)] overflow-y-auto " + isMobileMl} >
                                <DocNav docs={docs}/>
                            </div>
                        </aside>
                    }

                    {/* 主内容区 - 调宽并增加内边距 */}
                    <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-5xl mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DocLayout;
