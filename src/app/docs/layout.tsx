import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        tabs: [
          {
            title: '文件',
            url: '/docs',
          },
          {
            title: '政策與法務',
            url: '/docs/policies',
          },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}
