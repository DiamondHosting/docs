import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img
            src="https://pub-5ac549c470174e40b03aefe882592ada.r2.dev/dmlogo.webp"
            alt="DiamondHost Logo"
            width={28}
            height={28}
            className="h-7 w-7 rounded"
          />
          鑽石託管 DiamondHost
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}
