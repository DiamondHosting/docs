import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { MarkdownCopyButton, ViewOptionsPopover } from '@/components/docs-actions';
import fs from 'node:fs';
import path from 'node:path';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const gitConfig = {
    user: 'DiamondHosting',
    repo: 'docs',
    branch: 'main',
  };

  const filePath = (page as any).file?.path || '';
  const githubUrl = filePath ? `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${filePath}` : '#';

  let rawContent = '';
  if (filePath) {
    try {
      const fullPath = path.join(process.cwd(), 'content/docs', filePath);
      rawContent = fs.readFileSync(fullPath, 'utf-16le').toString();
      if (rawContent.includes('')) {
        rawContent = fs.readFileSync(fullPath, 'utf-8').toString();
      }
    } catch (e) {
      console.error('Failed to read file:', e);
    }
  }

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{ style: 'clerk' }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>

      <div className="flex flex-row gap-2 items-center border-b pb-6 mt-4 mb-8">
        <MarkdownCopyButton content={rawContent} />
        <ViewOptionsPopover
          githubUrl={githubUrl}
        />
      </div>

      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
