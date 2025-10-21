import '@/app/global.css';
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
    icon: 'https://pub-5ac549c470174e40b03aefe882592ada.r2.dev/dmlogo.webp',
    shortcut: 'https://pub-5ac549c470174e40b03aefe882592ada.r2.dev/dmlogo.webp',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-cmn-Hant" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
