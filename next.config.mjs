import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-5ac549c470174e40b03aefe882592ada.r2.dev',
      },
    ],
  },
};

export default withMDX(config);
