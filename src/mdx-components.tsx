import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import { ApiBasePath, ApiCodeExamples, ApiEndpoint, ApiOverview } from '@/components/api-docs';

function HydrationSafeParagraph(props: ComponentPropsWithoutRef<'p'>) {
  return <p {...props} suppressHydrationWarning />;
}

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ApiBasePath,
    ApiCodeExamples,
    ApiEndpoint,
    ApiOverview,
    p: HydrationSafeParagraph,
    ...components,
  };
}
