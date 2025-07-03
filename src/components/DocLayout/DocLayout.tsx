'use client';
import React, {useEffect, useState} from 'react';
// import DocNav from './DocNav';
import DocHeader from './DocHeader';
import {Doc, TocItem} from '@/lib/docs';
// import {notMobile, useResponsive} from "@/utils/responsiveUtils";
// import TableOfContents from "@/components/DocLayout/TableOfContents";
// import { cn } from '@/lib/utils';

interface DocLayoutProps {
    children: React.ReactNode;
    docs: Doc[];
    toc: TocItem[];
}

const DocLayout: React.FC<DocLayoutProps> = ({ children, docs, toc }) => {
    // const { isMobile, isTablet, isDesktop } = useResponsive();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const [isClient, setIsClient] = useState(false); // 新增客户端状态标志

    // useEffect(() => {
    //     setMobileMenuOpen(isDesktop);
    //     setIsClient(true); // 标记客户端已加载
    // }, [isDesktop]);

    // 简化移动端判断
    // const isSmallScreen = isMobile || isTablet;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <DocHeader
                onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                title={'sc回忆'}
                showMobileMenu={mobileMenuOpen}
            />

            <div className="flex w-full px-4 sm:px-6  lg:px-8">
                {/* 左侧导航 */}
                {/*{mobileMenuOpen && (*/}
                {/*    <aside className={cn(*/}
                {/*        "md:block py-6 pr-6",*/}
                {/*        isSmallScreen ? "fixed inset-0 z-40 bg-white w-64" : "w-64 lg:w-72 xl:w-80"*/}
                {/*    )}>*/}
                {/*        <div className={cn(*/}
                {/*            "sticky top-24 h-[calc(100vh-64px)] overflow-y-auto",*/}
                {/*            isSmallScreen ? "p-4" : ""*/}
                {/*        )}>*/}
                {/*            <DocNav docs={docs} />*/}
                {/*        </div>*/}
                {/*    </aside>*/}
                {/*)}*/}

                {/* 主内容区 */}
                <div className="flex-1">
                    <main className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-5xl mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </div>

                {/* 右侧目录 - 仅在桌面端显示 */}
                {/*{isClient && toc?.length > 0 && isDesktop && (*/}
                {/*    <aside className="lg:block w-64 flex-shrink-0">*/}
                {/*        <div className="sticky top-24">*/}
                {/*            <TableOfContents toc={toc} />*/}
                {/*        </div>*/}
                {/*    </aside>*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default DocLayout;
