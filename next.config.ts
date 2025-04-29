import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
      images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "files.studmart-dev.inxan.ru",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "files.studmart-dev.inxan.ru",
        pathname: "/Categories/**"
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
