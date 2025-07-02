"use client";
import DocSidebar from "@/components/doc/Sidbar";

export default function Docs() {
    return (
        <div className=" mx-auto">
            {/*<Heading title="PureAdmin 文档" description="基于多种主流技术开发的中后台管理系统模版" />*/}
            <div className="flex lg:pt-0 pt-16">
                <DocSidebar/>
                {/*<div className="max-w-4xl mx-auto">*/}
                <div className="flex-1 lg:p-8 p-4 overflow-auto min-h-screen">
                    <div className="mt-8 bg-white p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">介绍</h2>
                        <p className="mb-4">
                            vue-pure-admin是一款开源完全免费且开箱即用的中后台管理系统模版。
                            完全采用 ECMAScript 模块(ESM)规范来编写和组织代码，使用了最新的 Vue3、Vite、Element-Plus、
                            TypeScript、Pinia、Tailwindcss 等主流技术开发。
                        </p>

                        <div className="mt-8">
                            {/* 在这里添加文档内容 */}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
