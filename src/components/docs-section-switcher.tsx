'use client';

import Link from 'next/link';
import { BookOpen, Code2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function DocsSectionSwitcher() {
  const pathname = usePathname();
  const developerActive = pathname.startsWith('/docs/client-api');

  return (
    <nav className="docs-section-switcher" aria-label="文件分類">
      <Link
        href="/docs"
        data-active={!developerActive}
        data-section="user"
      >
        <BookOpen aria-hidden="true" />
        使用者
      </Link>
      <Link
        href="/docs/client-api"
        data-active={developerActive}
        data-section="developer"
      >
        <Code2 aria-hidden="true" />
        開發者
      </Link>
    </nav>
  );
}
