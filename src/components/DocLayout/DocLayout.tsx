'use client';
import React, {useEffect, useState} from 'react';
import DocNav from './DocNav';
import DocHeader from './DocHeader';
import {Doc, TocItem} from '@/lib/docs';
import {notMobile, useResponsive} from "@/utils/responsiveUtils";
import TableOfContents from "@/components/DocLayout/TableOfContents";
interface DocLayoutProps {
    children: React.ReactNode;
    docs: Doc[];
    toc: TocItem[];
}

const DocLayout: React.FC<DocLayoutProps> = ({ children, docs,toc }) => {
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

    function tocLength(){
        if(toc) {
            return toc.length > 0
        }
        return false;
    }


    return (
        <div className="flex flex-col min-h-screen bg-gray-50 ">
            <DocHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} title={'sc回忆'} showMobileMenu={mobileMenuOpen}  />

            <div className="flex  w-full px-4 sm:px-6 lg:px-8">
                {/* 移动端导航菜单 */}

                {/* 桌面端左侧导航 */}
                {mobileMenuOpen  &&
                    <aside className=" md:block w-64 lg:w-72 xl:w-80 py-6 pr-6">
                        <div className={"sticky top-24 h-[calc(100vh-64px)] overflow-y-auto " + isMobileMl} >
                            <DocNav docs={docs}/>
                        </div>
                    </aside>
                }

                <div className="flex  w-full">
                    {/* 主内容区 - 调宽并增加内边距 */}
                    <main className="mx-auto py-8 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-5xl mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </div>

                {/* 右侧目录 - 仅在桌面端显示 */}
                {tocLength() && notMobile() && (
                    <aside className="lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <TableOfContents toc={toc} />
                        </div>
                    </aside>
                )}

            </div>
        </div>
    );
};

export default DocLayout;
