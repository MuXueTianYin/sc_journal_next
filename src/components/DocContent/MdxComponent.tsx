'use client';

import React from 'react';

interface MdxComponentProps {
    content: string;
}

export default function MdxComponent({ content }: MdxComponentProps) {
    return (
        <div className="doc-content">
            <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="prose max-w-none"
            />
        </div>
    );
}
