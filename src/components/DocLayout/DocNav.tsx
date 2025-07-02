import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Doc } from '@/lib/docs';

interface DocNavProps {
    docs: Doc[];
    onSelect?: () => void;
}

const DocNav: React.FC<DocNavProps> = ({ docs, onSelect }) => {
    const pathname = usePathname();

    return (
        <nav className="space-y-1 sm:pt-10 md:pt-6 pt-8">
            <h3 className="px-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                日记目录
            </h3>
            <ul className="space-y-1">
                {docs.map((doc) => (
                    <li key={doc.slug}>
                        <Link
                            href={`/docs/${doc.slug}`}
                            onClick={onSelect}
                            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                                pathname === `/docs/${doc.slug}`
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {doc.title}
                            {doc.date && (
                                <span className="ml-auto text-xs text-gray-500">
                  {new Date(doc.date).toLocaleDateString('zh-CN')}
                </span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DocNav;
