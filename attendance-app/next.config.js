/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/attendance', // Replace with your repository name if different
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/attendance',
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
