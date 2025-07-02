import type { NextConfig } from 'next';

const HOST = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
	output: 'standalone',
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));
		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/i;
		}

		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'assets.example.com',
				pathname: '/account123/**',
			},
			{
				protocol: 'https',
				hostname: `files.${HOST}`,
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: `files.${HOST}`,
				pathname: '/Categories/**',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				pathname: '/**',
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
