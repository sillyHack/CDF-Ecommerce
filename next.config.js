/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // disable typescript issues when building
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ["lh3.googleusercontent.com", "files.stripe.com"] // authorizing images imported from other servers
  }
}

module.exports = nextConfig
