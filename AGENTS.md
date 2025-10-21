This file provides guidance to AI coding agents like Claude Code (claude.ai/code), Cursor AI, Codex, Gemini CLI, GitHub Copilot, and other AI coding assistants when working with code in this repository.

## Daily Commands
- `npm install`: required once after dependency changes; runs `fumadocs-mdx` postinstall to refresh the generated `.source` directory.
- `npm run dev`: launches Next.js 15 App Router in Turbopack mode at `http://localhost:3000` for both the landing page and docs preview.
- `npm run lint`: executes Next.js/ESLint flat config; use before committing to catch route and MDX typing issues.
- `npm run build`: produces the production build, validating MDX compilation and Next.js static generation.
- `npm run start`: serves the built app locally (run `npm run build` first).
- Tests are not configured; surface this gap if coverage is needed before adding any testing commands.

## Architecture Overview
- Next.js App Router project with two major route groups: `app/(home)` for the marketing landing page and `app/docs` for documentation powered by Fumadocs UI.
- Documentation content lives in `content/docs/*.mdx`; frontmatter is validated via Zod schemas defined in `source.config.ts`, and processed output is precompiled into `.source/index.ts` during `npm install`.
- `src/lib/source.ts` exposes a shared Fumadocs `source` loader; every docs-adjacent route (pages, API, OG images, LLM export) uses this singleton to avoid duplicating content-fetch logic.
- Shared layout chrome (logo, nav meta) is centralized in `src/lib/layout.shared.tsx` and reused by both `HomeLayout` and `DocsLayout` to keep navigation consistent across route groups.
- The global root layout `src/app/layout.tsx` wires up the Fumadocs UI provider, Inter font, and Tailwind entrypoint `global.css`, which extends Fumadocs presets with custom navigation theming.

## Content & Rendering Flow
- MDX files are converted to React components by `createMDX` in `next.config.mjs`; at runtime docs pages (`app/docs/[[...slug]]/page.tsx`) resolve the correct MDX module via the shared `source`, render titles/descriptions, and supply custom components through `getMDXComponents`.
- `source.getPage` powers static params generation (`generateStaticParams`) and `generateMetadata` so new docs automatically surface in SSG output and OG metadata.
- Updating or adding MDX requires re-running `npm run dev` (Turbopack hot reload) or `npm run build`; ensure `includeProcessedMarkdown` stays enabled in `source.config.ts` if LLM features rely on the processed body.

## Integrations & Endpoints
- Search: `app/api/search/route.ts` instantiates Fumadocs search (`createFromSource`) with Orama language settings; keep field additions synchronized with the loader if schema changes.
- Open Graph images: `app/og/docs/[...slug]/route.tsx` generates images per docs page using Fumadocs default template and the `getPageImage` helper; update `site` branding here when rebranding.
- LLM export: `app/llms-full.txt/route.ts` concatenates processed markdown for all docs via `getLLMText`; any changes to content formatting or access control should be reflected here.

## Styling & Theming
- Tailwind v4 `@import` directives in `src/app/global.css` pull in both Tailwind utilities and Fumadocs presets; component-level overrides (notably `#nd-nav`) rely on CSS custom properties to sync light/dark themes.
- When adjusting navigation visuals, modify `global.css` for colors and `baseOptions()` for structural elements to preserve consistency across the home and docs layouts.

## Operational Notes
- Path aliases `@/` and `@/.source` are defined in `tsconfig.json`; use them instead of relative paths when importing shared utilities or generated MDX modules.
- Keep `.source/` outputs out of manual edits—they are regenerated; update `content/docs` or `source.config.ts` instead.
- React 19 and Next.js 15 features are enabled; prefer Server Components unless client interactivity is required, and ensure new dependencies remain compatible with Turbopack (or disable it explicitly if issues arise).

## More Information
- 此專案請使用繁體中文
- 此文檔網址：https://docs.diamondhost.tw
- 商店網址：https://store.diamondhost.tw
- 客服信箱: service@diamondhost.tw
- 名稱優先使用 鑽石託管 (DiamondHost)
- 此專案使用 Fumadocs 作為文件系統，相關文件請參考：https://fumadocs.com