import React from 'react';
import Link from 'next/link';
import { getAllDocs } from '@/lib/docs';

export default async function DocsIndexPage() {
    const docs = await getAllDocs();

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">恋爱日记</h1>
            <ul className="space-y-4">
                {docs.map((doc) => (
                    <li key={doc.slug}>
                        <Link
                            href={`/docs/${doc.slug}`}
                            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-gray-900">{doc.title}</h2>
                            {doc.date && (
                                <p className="text-gray-500 mt-2">
                                    日期: {new Date(doc.date).toLocaleDateString('zh-CN')}
                                </p>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
