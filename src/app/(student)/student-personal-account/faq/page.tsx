'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import MarkdownRenderer from '@/components/ui/MarkdownRenderer/MarkdownRenderer';
import InputField from '@/components/ui/fields/input/InputField';
import { SelectField } from '@/components/ui/fields/select/SelectField';

import { transformToOptions } from '@/utils/dataTransform';
import { sendEmail } from '@/lib/api/email';
import { getStudentById } from '@/lib/api/students';

import { useAuth } from '@/context/AuthContext';
import IStudentFormData, {
	FaqQuestions,
	faqCategoryOptions,
} from '@/context/StudentPersonalContext';

import { BlackArrowDown } from '@/assets/icons/BlackArrowDown';
import { BlackArrowUp } from '@/assets/icons/BlackArrowUp';

const FaqPage = () => {
	const { role, id } = useAuth();
	const router = useRouter();
	const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null);
	const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>(
		Object.fromEntries(FaqQuestions.map((item) => [item.title, false])),
	);
	interface Option {
		label: string;
		value: string;
	}
	const [category, setCategory] = useState<Option | undefined>(undefined);
	const [question, setQuestion] = useState('');
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (role && role !== 'Student') {
			router.replace('/partner-personal-account');
		}
	}, [role, router]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const student = await getStudentById(id ?? '');
				setFetchStudent(student);
			} catch (error) {
				console.warn(error);
			}
		};
		if (id) {
			fetchData();
		}
	}, [id]);
	const toggleExpand = (heading: string) => {
		setExpandedStates((prev) => ({
			...prev,
			[heading]: !prev[heading],
		}));
	};

	const handleSubmit = async () => {
		if (!category || !question.trim()) {
			setErrorMessage('Пожалуйста, заполните все поля.');
			return;
		}

		setLoading(true);
		setErrorMessage('');
		setSuccessMessage('');

		try {
			const result = await sendEmail(
				category.label,
				question,
				`${fetchStudent?.firstName} ${fetchStudent?.lastName}`,
			);

			if (!result || result.error) {
				throw new Error('Ошибка при отправке');
			}

			setSuccessMessage('Вопрос успешно отправлен!');
			setCategory(undefined);
			setQuestion('');
		} catch (err) {
			console.warn(err);
			setErrorMessage('Ошибка при отправке. Попробуйте позже.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-[40px]">
			{/* Список вопросов */}
			<div className="border bg-[#f8f8f8] rounded-[15px] border-[rgba(0,0,0,0.20)] w-[588px] p-5">
				<h3 className="font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] mb-5">
					Часто задаваемые вопросы
				</h3>
				<div className="flex flex-col gap-5">
					{FaqQuestions.map(({ title, text }) => {
						const isExpanded = expandedStates[title];
						return (
							<div
								key={title}
								className="w-[548px] rounded-[15px] border border-[rgba(0,0,0,0.20)] bg-[#F8F8F8] text-[#032C28] p-5 font-[Mulish]"
							>
								<div className="flex justify-between font-extrabold">
									<p>{title}</p>
									<div onClick={() => toggleExpand(title)} className="cursor-pointer">
										{isExpanded ? <BlackArrowUp /> : <BlackArrowDown />}
									</div>
								</div>
								{isExpanded && (
									<article className="mt-5 text-[14px]">
										<MarkdownRenderer content={text} />
									</article>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Форма отправки вопроса */}
			<div className="border bg-[#f8f8f8] rounded-[15px] border-[rgba(0,0,0,0.20)] w-[588px] p-5">
				<p className="font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] mt-5 mb-5">
					Не нашли ответ? Задайте свой вопрос.
				</p>

				<div className="flex flex-col gap-5">
					<SelectField
						width={548}
						label="Выберете категорию вопроса"
						placeholder="Категория вопроса"
						options={transformToOptions(faqCategoryOptions)}
						labelFontSize={14}
						name="category"
						value={category}
						onChange={(e) => {
							const selectedOption = transformToOptions(faqCategoryOptions).find(
								(opt) => opt.value === e.target.value,
							);
							setCategory(selectedOption);
						}}
					/>
					<InputField
						width={548}
						name="question"
						placeholder="Введите вопрос..."
						labelFontSize={14}
						label="Вопрос"
						minRows={1}
						maxRows={10}
						value={question}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
					/>

					<button
						onClick={handleSubmit}
						disabled={loading}
						className="bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] mt-5 h-12 cursor-pointer rounded-[15px] border-none disabled:opacity-50"
					>
						{loading ? 'Отправка...' : 'Отправить'}
					</button>

					{successMessage && <p className="text-green-600">{successMessage}</p>}
					{errorMessage && <p className="text-red-600">{errorMessage}</p>}
				</div>
			</div>
		</div>
	);
};

export default FaqPage;
