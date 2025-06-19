import { Mulish, Nunito_Sans } from 'next/font/google';

import CookieConsent from '@/components/layouts/CookieConsent';
import MainLayout from '@/components/layouts/MainLayout';

import { AuthProvider } from '@/context/AuthContext';
import { CityProvider } from '@/context/CityContext';

import '@/styles/globals.css';

import { Metadata } from 'next';

import { generateMetadata } from '@/utils/generateMetadata';

export const metadata: Metadata = generateMetadata();

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
