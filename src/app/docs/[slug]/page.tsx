import React from 'react';
import DocContent from '@/components/DocContent/DocContent';
import { getDocBySlug, getAllDocs } from '@/lib/docs';
import DocsLayout from "@/app/docs/docsLayout";

export async function generateStaticParams() {
    const docs = await getAllDocs();
    return docs.map(doc => ({ slug: doc.slug }));
}
interface PageProps {
    params: {
        slug: string;
    };
}
export default async function DocPage({ params }: PageProps) {
    const { slug } = params;
    const doc = await getDocBySlug(slug);

    return (
        <DocsLayout toc={doc.toc}>
            <DocContent
                title={doc.title}
                content={doc.content}
                date={doc.date}
                tags={doc.tags}
            />
        </DocsLayout>
    );
}
