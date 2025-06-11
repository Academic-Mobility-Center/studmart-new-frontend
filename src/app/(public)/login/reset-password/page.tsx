'use client';

import { ChangeEvent, Suspense, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import ForgotPasswordConfirm from '@/components/forms/forgot-password-confirm/ForgotPasswordConfirm';
import LoginForm from '@/components/forms/login/LoginForm';
import LoginFormData from '@/types/LoginFormData';

function ResetPasswordPageContent() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const email = searchParams.get('Email') || '';
	const resetCode = searchParams.get('ResetCode') || '';
	const [formData, setFormData] = useState<LoginFormData>({
		email,
		passwordReset: '',
		passwordResetConfirm: '',
		password: '',
		passwordResetEmail: '',
		rememberMe: false,
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<>
			<div className="w-fit m-auto">
				<LoginForm />
			</div>
			<ForgotPasswordConfirm
				formData={formData}
				handleChange={handleChange}
				email={email}
				resetCode={resetCode}
				router={router}
			/>
		</>
	);
}

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<ResetPasswordPageContent />
		</Suspense>
	);
}
