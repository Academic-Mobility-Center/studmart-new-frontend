'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

export default function CookieConsent() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const consent = localStorage.getItem('cookie_consent');
		if (!consent) {
			setVisible(true);
		}
	}, []);

	const acceptCookies = () => {
		localStorage.setItem('cookie_consent', 'true');
		setVisible(false);
	};

	if (!visible) return null;

	return (
		<div className="fixed bottom-4 right-4 max-w-md bg-neutral-900 text-white p-4 rounded-xl shadow-lg text-sm z-50">
			<p>
				Мы используем
				<Link
					href="files/Политика конфиденциальности.pdf" // замените путь на нужный вам
					target="_blank"
					rel="noopener noreferrer"
					className="font-bold underline"
				>
					cookies
				</Link>
				, чтобы запоминать ваши предпочтения, подбирать подходящие промокоды и улучшать удобство
				использования сервиса.
			</p>
			<button
				onClick={acceptCookies}
				className="mt-3 px-4 py-1 bg-white text-black text-sm rounded-full hover:bg-gray-200 transition cursor-pointer"
			>
				Окей
			</button>
		</div>
	);
}
