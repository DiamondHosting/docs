'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      theme={{ forcedTheme: 'dark' }}
      search={{
        hotKey: [
          { display: 'Ctrl F', key: (e) => (e.ctrlKey || e.metaKey) && e.key === 'f' },
        ],
      }}
      i18n={{
        translations: {
          search: '搜尋...',
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
