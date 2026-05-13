"use client";

import React from 'react';
import Link from 'next/link';

interface DocHeaderProps {
  title: string;
}

const DocHeader: React.FC<DocHeaderProps> = ({ title }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500 text-white font-bold shadow-sm">
            R
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">私人纪念站</p>
            <h1 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h1>
          </div>
        </Link>

        <Link
          href="/diaries"
          className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
        >
          返回列表
        </Link>
      </div>
    </header>
  );
};

export default DocHeader;
