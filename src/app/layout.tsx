import '@/app/global.css';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: '鑽石託管 DiamondHost',
    template: '%s | 鑽石託管 DiamondHost',
  },
  description: '鑽石託管 DiamondHost 提供穩定的託管服務與完整的文件支援。',
  icons: {
    icon: 'https://r2.diamondhost.tw/logo.png',
    shortcut: 'https://r2.diamondhost.tw/logo.png',
  },
};



export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-cmn-Hant" className={inter.className} style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ forcedTheme: 'dark' }}>{children}</RootProvider>
      </body>
    </html>
  );
}
