import type { NextConfig } from "next";
const HOST = process.env.NEXT_PUBLIC_API_URL;

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
        hostname: `files.${HOST}`,
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: `files.${HOST}`,
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
