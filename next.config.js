/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['ipfs.io', 'metadata.unstoppabledomains.com'],
        minimumCacheTTL: 60,
    },
};

module.exports = nextConfig;
