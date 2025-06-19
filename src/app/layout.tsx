import { Mulish, Nunito_Sans } from 'next/font/google';

import CookieConsent from '@/components/layouts/CookieConsent';
import MainLayout from '@/components/layouts/MainLayout';

import { AuthProvider } from '@/context/AuthContext';
import { CityProvider } from '@/context/CityContext';

import '@/styles/globals.css';

const mulish = Mulish({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '600', '700', '800', '900'],
	variable: '--font-buttons',
	display: 'swap',
});

const nunitoSans = Nunito_Sans({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '600', '700', '800', '900'],
	variable: '--font-headings',
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" data-theme={'light'}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Студмарт</title>
				<meta name="description" content="Скидки для студентов" />
				<meta property="og:title" content="Студмарт" />
				<meta property="og:description" content="Скидки для студентов" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_API_URL}`} />
				<meta
					property="og:image"
					content={`https://${process.env.NEXT_PUBLIC_API_URL}/my-favicon/web-app-manifest-192x192.png`}
				/>
				<meta name="twitter:title" content="Студмарт" />
				<meta name="twitter:description" content="Скидки для студентов" />
				<meta name="apple-mobile-web-app-title" content="Студмарт" />
			</head>
			<body className={`${nunitoSans.variable} ${mulish.variable} antialiased `}>
				<CityProvider>
					<AuthProvider>
						<MainLayout>{children}</MainLayout>
						<CookieConsent />
					</AuthProvider>
				</CityProvider>
			</body>
		</html>
	);
}
