/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    // Needed because of SWC failure. https://nextjs.org/docs/messages/failed-loading-swc
    swcMinify: false,
  },
};

module.exports = nextConfig;
