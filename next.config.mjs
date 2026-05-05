/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['bevilacqua.com.br'],
  },
  trailingSlash: {
    source: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  output: 'standalone',
}

export default nextConfig;
