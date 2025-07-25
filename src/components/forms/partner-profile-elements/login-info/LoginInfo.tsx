import InputField from '@/components/ui/fields/input/InputField';
import PasswordField from '@/components/ui/fields/password/PasswordField';

import { PartnerPersonalAccountFormData } from '@/types/PartnerPesonalAccount';

interface Props {
	formData: PartnerPersonalAccountFormData;
	handleForgotPasswordClick: () => void;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	errors: {
		personalEmail?: string;
		password?: string;
	};
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
}
const sectionTitleClasses =
	'[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0';
const fieldsRowClasses = 'flex justify-center items-start flex-row mt-5 gap-[24px]';
const inputContainerClasses =
	'box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto ';
const changePasswordLinkClasses =
	'cursor-pointer font-[Mulish] text-sm font-normal underline text-[#888888] mt-[5px] m-0 pl-[286px] pr-[46px] p-0';

const LoginInfo: React.FC<Props> = ({
	handleChange,
	formData,
	errors,
	handleBlur,
	handleForgotPasswordClick,
}) => {
	return (
		<div className="">
			<h2 className={sectionTitleClasses}>Логин и пароль</h2>
			<div className={fieldsRowClasses}>
				<div className={inputContainerClasses}>
					<InputField
						name="personalEmail"
						label="Почта"
						placeholder="ivanov@gmail.com"
						width={262}
						labelFontSize={16}
						value={formData?.personalEmail}
						onChange={handleChange}
						onBlur={handleBlur}
						maxRows={1}
					/>
					{errors.personalEmail && (
						<p className="text-red-600 text-sm font-medium">{errors.personalEmail}</p>
					)}
				</div>
				<div className={inputContainerClasses}>
					<PasswordField
						name="password"
						label="Пароль"
						placeholder="********"
						width={262}
						labelFontSize={16}
						value={formData.password}
						onChange={handleChange}
						onBlur={handleBlur}
						disabled={true}
					/>
					{errors.password && <p className="text-red-600 text-sm font-medium">{errors.password}</p>}
				</div>
			</div>
			<p className={changePasswordLinkClasses} onClick={handleForgotPasswordClick}>
				Сменить пароль
			</p>
		</div>
	);
};

export default LoginInfo;
