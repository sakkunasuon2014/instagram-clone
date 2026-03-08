/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: process.env.BACKEND_PROTOCOL || "http",
        hostname: process.env.BACKEND_HOST || "localhost",
        port: "3001",
      },
    ],
    localPatterns: [
      {
        pathname: '/uploads/images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
