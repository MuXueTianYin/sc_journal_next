import React from 'react';
import DocLayout from '@/components/DocLayout/DocLayout';
import { getAllDocs } from '@/lib/docs';

export default async function DocsLayout(props: { children: React.ReactNode }) {
    const docs = await getAllDocs();
    return (
        <DocLayout docs={docs}>
            {props.children}
        </DocLayout>
    );
}
