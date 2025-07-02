import React from 'react';
import DocContent from '@/components/DocContent/DocContent';
import { getDocBySlug, getAllDocs } from '@/lib/docs';
import DocsLayout from "@/app/docs/docsLayout";

export async function generateStaticParams() {
    const docs = await getAllDocs();
    return docs.map(doc => ({ slug: doc.slug }));
}

export default async function DocPage({
                                          params,
                                      }: {
    params: { slug: string };
}) {
    const { slug } = await params
    const doc = await getDocBySlug(slug);

    return (
        <DocsLayout>
            <DocContent
                title={doc.title}
                content={doc.content}
                toc={doc.toc}
            />
        </DocsLayout>
    );
}
