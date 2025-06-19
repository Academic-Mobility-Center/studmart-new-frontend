import type { Metadata } from 'next';

import { onlyText } from './clearText';

const BASE_URL = `https://${process.env.NEXT_PUBLIC_API_URL}`;
const OG_IMAGE = `${BASE_URL}/favicons/android-chrome-192x192.png`;

export function generateMetadata(title?: string, description?: string): Metadata {
	const finalTitle = title ?? 'Студмарт';
	const finalDescription = description ? onlyText(description, 197) : 'Скидки для студентов';

	return {
		title: finalTitle,
		description: finalDescription,
		manifest: '/site.webmanifest',
		icons: {
			icon: '/favicons/favicon.ico',
			apple: '/favicons/apple-icon.png',
			shortcut: '/favicons/favicon.ico',
			other: [
				{ rel: 'apple-touch-icon', sizes: '57x57', url: '/favicons/apple-touch-icon-57x57.png' },
				{ rel: 'apple-touch-icon', sizes: '72x72', url: '/favicons/apple-touch-icon-72x72.png' },
				{ rel: 'apple-touch-icon', sizes: '76x76', url: '/favicons/apple-touch-icon-76x76.png' },
				{ rel: 'apple-touch-icon', sizes: '96x96', url: '/favicons/apple-touch-icon-96x96.png' },
				{
					rel: 'apple-touch-icon',
					sizes: '114x114',
					url: '/favicons/apple-touch-icon-114x114.png',
				},
				{
					rel: 'apple-touch-icon',
					sizes: '120x120',
					url: '/favicons/apple-touch-icon-120x120.png',
				},
				{
					rel: 'apple-touch-icon',
					sizes: '144x144',
					url: '/favicons/apple-touch-icon-144x144.png',
				},
				{
					rel: 'apple-touch-icon',
					sizes: '152x152',
					url: '/favicons/apple-touch-icon-152x152.png',
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					url: '/favicons/apple-touch-icon-180x180.png',
				},
			],
		},
		openGraph: {
			title: finalTitle,
			description: finalDescription,
			type: 'website',
			url: BASE_URL,
			images: [
				{
					url: OG_IMAGE,
					width: 192,
					height: 192,
					alt: finalTitle,
				},
			],
		},
		twitter: {
			title: finalTitle,
			description: finalDescription,
			images: [OG_IMAGE],
			card: 'summary',
		},
		appleWebApp: {
			title: finalTitle,
		},
	};
}
