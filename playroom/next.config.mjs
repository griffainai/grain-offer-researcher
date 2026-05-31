/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk'],
    outputFileTracingIncludes: {
      '/api/research': ['./.researcher/**/*'],
    },
  },
};
export default nextConfig;
