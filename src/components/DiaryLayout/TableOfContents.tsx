// // src/components/TableOfContents.tsx
// "use client"
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import {TocItem} from "@/lib/docs";
//
// interface Heading {
//     id: string;
//     text: string;
//     level: number;
// }
//
// interface TableOfContentsProps {
//     resultToc?: TocItem[];
// }
//
// const TableOfContents: React.FC<TableOfContentsProps> = ({ resultToc }) => {
//     const [activeId, setActiveId] = useState('');
//     const [isExpanded, setIsExpanded] = useState(true);
//
//     useEffect(() => {
//         const handleScroll = () => {
//             const headingElements = resultToc.map(({ id }) =>
//                 document.getElementById(id)
//             ).filter(Boolean) as HTMLElement[];
//
//             if (headingElements.length === 0) return;
//
//             // 找到距离顶部最近的标题
//             const closestHeading = headingElements.reduce((closest, heading) => {
//                 const rect = heading.getBoundingClientRect();
//                 if (rect.top < 100 && rect.top > closest.top) {
//                     return { id: heading.id, top: rect.top };
//                 }
//                 return closest;
//             }, { id: '', top: -Infinity });
//
//             if (closestHeading.id && activeId !== closestHeading.id) {
//                 setActiveId(closestHeading.id);
//             }
//         };
//
//         // 初始设置第一个标题为活动状态
//         if (resultToc.length > 0 && !activeId) {
//             setActiveId(resultToc[0].id);
//         }
//
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [resultToc, activeId]);
//
//     if (resultToc.length === 0) return null;
//
//     return (
//         <div className="sticky top-24">
//             <div
//                 className="flex items-center justify-between mb-3 cursor-pointer"
//                 onClick={() => setIsExpanded(!isExpanded)}
//             >
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">文章目录</h3>
//                 <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
//                     {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                 </button>
//             </div>
//
//             <motion.div
//                 initial={{ height: 'auto' }}
//                 animate={{ height: isExpanded ? 'auto' : 0 }}
//                 className="overflow-hidden"
//             >
//                 <ul className="space-y-2 text-sm border-l-2 border-gray-200 dark:border-gray-700 pl-4">
//                     {resultToc.map((heading) => (
//                         <li
//                             key={heading.id}
//                             style={{
//                                 paddingLeft: `${(heading.level - 2) * 12}px`,
//                                 borderLeft: activeId === heading.id
//                                     ? '2px solid rgb(236, 72, 153)'
//                                     : 'none',
//                                 marginLeft: activeId === heading.id
//                                     ? '-2px'
//                                     : '0'
//                             }}
//                             className="relative transition-all duration-200"
//                         >
//                             <Link
//                                 href={`#${heading.id}`}
//                                 className={`block py-1 transition-colors truncate ${
//                                     activeId === heading.id
//                                         ? 'text-pink-600 dark:text-pink-400 font-medium'
//                                         : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
//                                 }`}
//                             >
//                                 {heading.text}
//                             </Link>
//
//                             {activeId === heading.id && (
//                                 <motion.div
//                                     layoutId="toc-highlight"
//                                     className="absolute inset-y-0 left-0 w-full bg-pink-50 dark:bg-pink-900/20 rounded -z-10"
//                                     initial={false}
//                                     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                                 />
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//
//                 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
//                     共 {resultToc.length} 个章节
//                 </div>
//             </motion.div>
//         </div>
//     );
// };
//
// export default TableOfContents;
