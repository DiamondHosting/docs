import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';
import type { Folder, Root } from 'fumadocs-core/page-tree';
import { BookOpen, Code2 } from 'lucide-react';
import { DocsSectionSwitcher } from '@/components/docs-section-switcher';

function createSectionedTree(): Root {
  const tree = source.pageTree;
  const developerFolder = tree.children.find(
    (node): node is Folder =>
      node.type === 'folder' &&
      (node.index?.url === '/docs/client-api' ||
        node.children.some(
          (child) => child.type === 'page' && child.url === '/docs/client-api',
        )),
  );

  if (!developerFolder) return tree;

  const buyerChildren = tree.children.filter(
    (node) => node !== developerFolder,
  );

  return {
    ...tree,
    children: [
      {
        type: 'folder',
        name: '使用者指南',
        description: '購買、設定與管理伺服器',
        icon: <BookOpen />,
        root: true,
        children: buyerChildren,
      },
      {
        ...developerFolder,
        name: '開發者',
        description: 'Client API 與整合指南',
        icon: <Code2 />,
        root: true,
      },
    ],
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={createSectionedTree()}
      tabs={false}
      sidebar={{ banner: <DocsSectionSwitcher key="docs-section-switcher" /> }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
