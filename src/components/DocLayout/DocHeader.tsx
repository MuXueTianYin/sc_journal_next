'use client';

import React, { useState } from 'react';
import UserMenu from './UserMenu';
import { Button } from '@/components/ui/button';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface DocHeaderProps {
  title: string;
}

const DocHeader: React.FC<DocHeaderProps> = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link className="text-xl font-bold text-gray-900 dark:text-white" href="/diaries">
                {title}
              </Link>
            </div>

            <div className="hidden flex-1 max-w-lg md:flex md:items-center md:gap-2 md:mx-8">
              <div className="flex w-full items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-1 text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
                <Search className="mr-2 h-5 w-5 shrink-0" />
                <Input
                  placeholder="搜索日记、标签或日期..."
                  className="h-9 flex-1 border-none bg-transparent pl-0 shadow-none focus-visible:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="搜索输入框"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                onClick={() => setIsUserMenuOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
    </>
  );
};

export default DocHeader;
