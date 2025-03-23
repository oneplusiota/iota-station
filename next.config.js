/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || 'local',
  },
  images: {
    domains: ['github.com', 'raw.githubusercontent.com'],
  },
};

module.exports = nextConfig;
