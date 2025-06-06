import React, { ChangeEvent, useState } from 'react';

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import PasswordField from '@/components/fields/password/PasswordField';
import { resetPassword } from '@/lib/api/auth';
import LoginFormData from '@/types/LoginFormData';

interface ForgotPasswordConfirmProps {
	formData: LoginFormData;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	email: string;
	resetCode: string;
	router: AppRouterInstance;
}
const ForgotPasswordConfirm: React.FC<ForgotPasswordConfirmProps> = ({
	formData,
	handleChange,
	email,
	resetCode,
	router,
}) => {
	const [errors, setErrors] = useState<{ passwordReset?: string; passwordResetConfirm?: string }>({
		passwordReset: '',
		passwordResetConfirm: '',
	});
	const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);
	const [loading, setLoading] = useState(false);
	const validate = () => {
		const newErrors: { passwordReset?: string; passwordResetConfirm?: string } = {};

		const password = formData.passwordReset;
		const confirmPassword = formData.passwordResetConfirm;

		const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(
			password,
		);

		if (!password) {
			newErrors.passwordReset = 'Введите пароль';
		} else if (password.length < 8) {
			newErrors.passwordReset = 'Длина пароля должна составлять не менее 8 символов';
		} else if (!isValidPassword) {
			newErrors.passwordReset =
				'Пароль должен состоять из заглавных и строчных букв, цифр и одного специального символа';
		}

		if (confirmPassword.length < 8) {
			newErrors.passwordResetConfirm = 'Подтверждение пароля должно содержать минимум 8 символов';
		} else if (password !== confirmPassword) {
			newErrors.passwordResetConfirm = 'Пароли не совпадают';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) return;
		setLoading(true);
		try {
			const response = await resetPassword(email, resetCode, formData.passwordResetConfirm);
			if (response.status === 204) {
				setIsSentSuccessfully(true);
				setTimeout(() => {
					router.push('/login');
				}, 2000);
			} else {
				setErrors({ passwordResetConfirm: 'Ошибка при отправке' });
			}
		} catch (error) {
			console.warn(error);
			setErrors({ passwordResetConfirm: 'Ошибка соединения' });
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			{isSentSuccessfully ? (
				<div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] text-center">
					<h2 className="text-2xl font-extrabold text-[#032c28] mb-4">Пароль изменён</h2>
					<p className="text-[#032c28] text-sm font-medium">
						Ваш новый пароль успешно сохранён. Теперь вы можете войти в личный кабинет.
					</p>
				</div>
			) : (
				<div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
					<h2 className="text-2xl font-extrabold text-[#032c28] mb-4">Сброс пароля</h2>

					<PasswordField
						label="Введите новый пароль"
						placeholder="********"
						name="passwordReset"
						value={formData.passwordReset}
						onChange={handleChange}
						labelFontSize={14}
						width={350}
					/>
					{errors?.passwordReset && (
						<p className="text-red-600 text-sm font-medium mt-1">{errors.passwordReset}</p>
					)}

					<PasswordField
						label="Подтвердите новый пароль"
						placeholder="********"
						name="passwordResetConfirm"
						value={formData.passwordResetConfirm}
						onChange={handleChange}
						width={350}
						labelFontSize={14}
					/>
					{errors?.passwordResetConfirm && (
						<p className="text-red-600 text-sm font-medium mt-1">{errors.passwordResetConfirm}</p>
					)}

					<button
						type="button"
						className="w-full bg-[#8fe248] text-[#032c28] p-2 rounded-2xl mt-4"
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? 'Отправка...' : 'Отправить'}
					</button>
				</div>
			)}
		</div>
	);
};

export default ForgotPasswordConfirm;

// return(
//     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-[5px] z-50">
//         <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
//             <h2 className="text-2xl font-extrabold text-[#032c28]">Сброс пароля</h2>
//             <PasswordField
//                 label="Введите новый пароль"
//                 placeholder="********"
//                 name="passwordReset"
//                 value={formData.passwordReset}
//                 onChange={handleChange}
//                 labelFontSize={14}
//                 width={350}
//             />
//             {errors?.passwordReset && (
//                 <p className="text-red-600 text-sm font-medium mt-1">{errors.passwordReset}</p>
//             )}
//             <PasswordField
//                 label="Подтвердите новый пароль"
//                 placeholder="********"
//                 name="passwordResetConfirm"
//                 value={formData.passwordResetConfirm}
//                 onChange={handleChange}
//                 width={350}
//                 labelFontSize={14}
//             />
//             {errors?.passwordResetConfirm && (
//                     <p className="text-red-600 text-sm font-medium mt-1">{errors.passwordResetConfirm}</p>
//             )}
//             <button className="w-full bg-[#8fe248] text-[#032c28] p-2 rounded-2xl mt-4" onClick={handleSubmit}>
//                 Сохранить
//             </button>
//         </div>
//     </div>
// )
{
	/* <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
            <h2 className="text-2xl font-extrabold text-[#032c28] mb-4">Сброс пароля</h2>
      
            <PasswordField 
              label="Введите новый пароль" 
              placeholder="********"
              name="passwordReset"
              value={formData.passwordReset}
              onChange={handleChange}  
              labelFontSize={14}      
              width={350}            
            />
            {errors?.passwordReset && (
              <p className="text-red-600 text-sm font-medium mt-1">{errors.passwordReset}</p>
            )}                
      
            <PasswordField 
              label="Подтвердите новый пароль" 
              placeholder="********"
              name="passwordResetConfirm"
              value={formData.passwordResetConfirm}
              onChange={handleChange}  
              width={350} 
              labelFontSize={14}                    
            />
            {errors?.passwordResetConfirm && (
              <p className="text-red-600 text-sm font-medium mt-1">{errors.passwordResetConfirm}</p>
            )} 
      
            <button 
              className="w-full bg-[#8fe248] text-[#032c28] p-2 rounded-2xl mt-4 hover:bg-[#7bdc3a] transition"
              onClick={handleSubmit}
            >
              Сохранить
            </button>
          </div> */
}
