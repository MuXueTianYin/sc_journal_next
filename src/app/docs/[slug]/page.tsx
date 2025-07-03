import React from 'react';
// import DocContent from '@/components/DocContent/DocContent';
import {getAllDocs, getDocBySlug} from '@/lib/docs';
import DocsLayout from "@/app/docs/docsLayout";
import DocContent from "@/components/DocContent/DocContent";

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
    const { slug } = await params;
    const doc = await getDocBySlug(slug);


    return (
        <DocsLayout toc={doc.toc}>
            <DocContent
                title={doc.title}
                content={doc.mdContent}
            />
        </DocsLayout>
    );
}
