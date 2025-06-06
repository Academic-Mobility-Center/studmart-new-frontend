'use client';

import { ChangeEvent, Suspense, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import ForgotPasswordConfirm from '@/components/forms/forgot-password-confirm/ForgotPasswordConfirm';
import LoginForm from '@/components/forms/login/LoginForm';
import NewHeader from '@/components/new-header/NewHeader';
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
		<div className="min-w-[1600px] bg-[#f8f8f8] flex flex-col items-center h-screen relative">
			<NewHeader isAuthenticated={false} />
			<div className="flex flex-col items-center min-w-[1280px] pb-[105px]">
				<LoginForm />
			</div>
			<ForgotPasswordConfirm
				formData={formData}
				handleChange={handleChange}
				email={email}
				resetCode={resetCode}
				router={router}
			/>
		</div>
	);
}

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<ResetPasswordPageContent />
		</Suspense>
	);
}
