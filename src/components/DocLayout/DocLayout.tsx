"use client";
import React, {Suspense} from 'react';
import DocHeader from './DocHeader';
import DocContent from "@/components/DocContent/DocContent";
import {SidebarProvider} from "@/components/ui/sidebar";
import {Diary} from "@/utils/content/utils";
import AppSidebar from "@/components/layout/app-sidebar";


interface DocLayoutProps {
    doc: Diary;
    docs: Diary[];
}


const DocLayout: React.FC<DocLayoutProps> = ({doc,docs}) => {



    return (
        <SidebarProvider>
            {/*<AppSidebar />*/}
            <main>
                <div className="flex flex-col min-h-screen bg-gray-50">
                    <DocHeader
                        title={'sc回忆'}
                    />
                    <div className="flex w-full  sm:px-6  lg:px-8">
                        <Suspense fallback={<div>加载更多...</div>}>
                            <div className='z-50 sticky  h-[calc(100vh-64px)] overflow-y-auto pt-8'>
                                <AppSidebar docs={docs}/>
                                {/*<DiaryNavigation diaries={docs} currentId={doc?.id} />*/}
                            </div>
                        </Suspense>
                        {/* 主内容区 */}
                        <div className="flex-1">
                            <main className="py-8 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-5xl mx-auto w-full">
                                    <DocContent
                                        title={doc.title}
                                        content={doc.content}
                                    />
                                </div>
                            </main>
                        </div>
                        {/* 右侧目录 - 仅在桌面端显示 */}
                        {/*{isClient && doc.resultToc?.length > 0 && isDesktop && (*/}
                        {/*    <aside className="lg:block w-64 flex-shrink-0">*/}
                        {/*        <Suspense fallback={<div>加载更多...</div>}>*/}
                        {/*            <div className="sticky top-24">*/}
                        {/*                <TableOfContents toc={doc.resultToc}/>*/}
                        {/*            </div>*/}
                        {/*        </Suspense>*/}
                        {/*    </aside>*/}
                        {/*)}*/}
                    </div>

                </div>
            </main>
        </SidebarProvider>

    )
        ;
};

export default DocLayout;
