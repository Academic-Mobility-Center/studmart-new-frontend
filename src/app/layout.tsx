import { Metadata } from 'next';
import { Mulish, Nunito_Sans } from 'next/font/google';

import CookieConsent from '@/components/layouts/CookieConsent';
import MainLayout from '@/components/layouts/MainLayout';

import { generateMetadata } from '@/utils/generateMetadata';

import { AuthProvider } from '@/context/AuthContext';
import { CityProvider } from '@/context/CityContext';

import '@/styles/globals.css';

import { QueryProvider } from '@/components/layouts/providers/QueryProvider';

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

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" data-theme={'light'}>
			<body className={`${nunitoSans.variable} ${mulish.variable} antialiased `}>
				<QueryProvider>
					<CityProvider>
						<AuthProvider>
							<MainLayout>{children}</MainLayout>
							<CookieConsent />
						</AuthProvider>
					</CityProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
