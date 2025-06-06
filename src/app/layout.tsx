import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import { Mulish, Nunito_Sans } from 'next/font/google';

import CookieConsent from '@/components/CookieConsent';
import { AuthProvider } from '@/context/AuthContext';
import { CityProvider } from '@/context/CityContext';

const mulish = Mulish({
	subsets: ['latin'],
	weight: ['400', '600', '700'], // выбери нужные веса, которые используешь
	variable: '--font-mulish',
	display: 'swap',
});
const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
	subsets: ['latin'],
	weight: ['400', '600', '700', '800'], // выбери нужные веса
	variable: '--font-nunito-sans', // кастомная CSS-переменная (необязательно)
	display: 'swap',
});
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${nunitoSans.variable} ${mulish.variable} antialiased `}
			>
				<CityProvider>
					<AuthProvider>
						{children}
						<CookieConsent />
					</AuthProvider>
				</CityProvider>
			</body>
		</html>
	);
}
