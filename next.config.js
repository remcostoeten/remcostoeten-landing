/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "cdn.builder.io",
      "cdn.dribbble.com",
      "dribbble.com",
    ],
  },
};

module.exports = nextConfig;
