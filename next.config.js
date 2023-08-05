const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    // Needed because of SWC failure. https://nextjs.org/docs/messages/failed-loading-swc
    swcMinify: false,
  },
  webpack: (config, { buildId, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        SERVICE_WORKER_HASH: JSON.stringify(buildId), // Replace 'your_generated_hash_or_version' with the actual hash/version
      })
    );
    config.plugins.push(
      new WebpackManifestPlugin({
        fileName: '../public/asset-manifest.json',
        // Set the publicPath to an empty string to remove the /_next part
        publicPath: '/',
      })
    );
    return config;
  },
};

module.exports = nextConfig;
