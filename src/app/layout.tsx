import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import { Nunito_Sans } from 'next/font/google'
import { Mulish } from 'next/font/google'
import { CityProvider } from "@/context/CityContext";
import CookieConsent from "@/components/CookieConsent"
const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // выбери нужные веса, которые используешь
  variable: '--font-mulish',
  display: 'swap',
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Студмарт",
  description: "Скидки для студентов",
  openGraph: {
    title: "Студмарт",
    description: "Скидки для студентов",
    type: "website",
    locale: "ru_RU",
  },
  other: {
    "apple-mobile-web-app-title": "Студмарт",
  },
};

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'], // выбери нужные веса
  variable: '--font-nunito-sans',       // кастомная CSS-переменная (необязательно)
  display: 'swap',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="theme-color" content="#ffffff"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunitoSans.variable} ${mulish.variable} antialiased `}
      >
        <CityProvider>
          <AuthProvider>
            {children}
            <CookieConsent/>
          </AuthProvider>
        </CityProvider>

      </body>
    </html>
  );
}
