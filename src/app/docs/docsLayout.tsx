import React from 'react';
import DocLayout from '@/components/DocLayout/DocLayout';
import {getAllDocs, TocItem} from '@/lib/docs';

export default async function DocsLayout(props: { children: React.ReactNode ,  toc: TocItem[]; }) {
    const docs = await getAllDocs();
    const docsWithKeys = docs.map(doc => ({
        ...doc,
        key:  doc.slug || doc.title // 使用文档的唯一标识符
    }));

    return (
        <DocLayout docs={docsWithKeys}
                   toc={props.toc}>
            {props.children}
        </DocLayout>
    );
}
