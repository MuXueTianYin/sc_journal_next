'use client';

import { useEffect, useState } from 'react';
import { HEART_TREE_LINES } from '@/lib/effects/config';

type TypewriterTextProps = {
  active: boolean;
};

function buildHtml(lines: typeof HEART_TREE_LINES) {
  return lines
    .map((line) => {
      if (line.type === 'h1') return `<h1>${line.text}</h1>`;
      if (line.type === 'h2') return `<h2>${line.text}</h2>`;
      if (line.type === 'sign') return `<p class="sign">${line.text}</p>`;
      return `<p>${line.text}</p>`;
    })
    .join('<br/>');
}

export default function TypewriterText({ active }: TypewriterTextProps) {
  const [html, setHtml] = useState('');
  const fullHtml = buildHtml(HEART_TREE_LINES);

  useEffect(() => {
    if (!active) return;
    let progress = 0;
    const timer = setInterval(() => {
      if (progress >= fullHtml.length) {
        setHtml(fullHtml);
        clearInterval(timer);
        return;
      }
      const current = fullHtml.charAt(progress);
      if (current === '<') {
        progress = fullHtml.indexOf('>', progress) + 1;
      } else {
        progress += 1;
      }
      const cursor = progress & 1 ? '_' : '';
      setHtml(fullHtml.substring(0, progress) + cursor);
    }, 75);
    return () => clearInterval(timer);
  }, [active, fullHtml]);

  return (
    <div
      className={`heart-tree-code ${active ? 'visible' : ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
