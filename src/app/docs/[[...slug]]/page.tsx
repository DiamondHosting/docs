import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DeveloperPortalHeader } from '@/components/api-docs';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug);
  if (!page) notFound();
  const isDeveloperPage = slug[0] === 'client-api';
  const pageToc = (page.data as any).toc ?? [];
  const visibleToc = isDeveloperPage
    ? pageToc.filter((item: { depth: number }) => item.depth <= 2)
    : pageToc;

  const { body: MDX } = page.data as any;
  const markdownUrl = getPageMarkdownUrl(page).url;

  const gitConfig = {
    user: 'DiamondHosting',
    repo: 'docs',
    branch: 'main',
  };

  return (
    <DocsPage
      className={isDeveloperPage ? 'developer-doc-page' : undefined}
      toc={visibleToc}
      full={(page.data as any).full}
      tableOfContent={{ style: isDeveloperPage ? 'normal' : 'clerk' }}
    >
      {isDeveloperPage ? <DeveloperPortalHeader /> : null}
      <DocsTitle className={isDeveloperPage ? 'developer-doc-title' : undefined}>{page.data.title}</DocsTitle>
      <DocsDescription className={isDeveloperPage ? 'developer-doc-description' : 'mb-0'}>{page.data.description}</DocsDescription>
      <div className={isDeveloperPage ? 'developer-title-rule' : 'flex flex-row gap-2 items-center border-b pb-6 mt-4 mb-8'} />
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
