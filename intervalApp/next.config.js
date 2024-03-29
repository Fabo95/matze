const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Needed because of SWC failure. https://nextjs.org/docs/messages/failed-loading-swc
    swcMinify: false,
  },
  reactStrictMode: false,
  webpack: (config, { buildId, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        SERVICE_WORKER_HASH: JSON.stringify(buildId), // Replace 'your_generated_hash_or_version' with the actual hash/version
      })
    );

    config.plugins.push(
      new WebpackManifestPlugin({
        fileName: '../public/asset-manifest.json',
        // We generate asset-manifest.json with files from .next/static to precache them with the sw.
        filter: (file) => file.name.includes('static'),
      })
    );
    return config;
  },
};

module.exports = nextConfig;
