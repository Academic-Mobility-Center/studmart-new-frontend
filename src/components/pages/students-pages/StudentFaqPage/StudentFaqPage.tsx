'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import FaqItem from '@/components/sections/FaqBlock/FaqItem/FaqItem';
import ButtonCustom from '@/components/ui/ButtonCustom';
import Loader from '@/components/ui/Loader';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer/MarkdownRenderer';
import InputSelectField from '@/components/ui/inputs/InputSelectField';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { transformToOptions } from '@/utils/dataTransform';
import { sendEmail } from '@/lib/api/email';
import { getStudentById } from '@/lib/api/students';

import { useAuth } from '@/context/AuthContext';
import IStudentFormData, {
	FaqQuestions,
	faqCategoryOptions,
} from '@/context/StudentPersonalContext';

import styles from './StudentFaqPage.module.css';

const StudentFaqPage = () => {
	const { role, id } = useAuth();
	const router = useRouter();
	const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null);
	const [isLoadingStudent, setIsLoadingStudent] = useState(false);

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
				setIsLoadingStudent(true);
				const student = await getStudentById(id ?? '');
				setFetchStudent(student);
			} catch (error) {
				console.warn(error);
			} finally {
				setIsLoadingStudent(false);
			}
		};
		if (id) {
			fetchData();
		}
	}, [id]);

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

	if (isLoadingStudent) return <Loader />;

	return (
		<div className={styles['faq-container']}>
			{/* Список вопросов */}
			<div className={styles['section']}>
				<h3 className={styles['section-title']}>Часто задаваемые вопросы</h3>
				<div className={styles['questions-list']}>
					{FaqQuestions.map(({ title, text }, index) => {
						return (
							<FaqItem key={title + index} heading={title} className={styles['question-item']}>
								<MarkdownRenderer content={text} />
							</FaqItem>
						);
					})}
				</div>
			</div>

			{/* Форма отправки вопроса */}
			<div className={styles['section']}>
				<p className={styles['section-title']}>Не нашли ответ? Задайте свой вопрос.</p>
				<div className={styles['form-container']}>
					<InputSelectField
						label="Выберете категорию вопроса"
						placeholder="Категория вопроса"
						options={transformToOptions(faqCategoryOptions)}
						name="category"
						value={category}
						onChange={(e) => {
							const selectedOption = transformToOptions(faqCategoryOptions).find(
								(opt) => opt.value === e.target.value,
							);
							setCategory(selectedOption);
						}}
					/>
					<InputTextField
						name="question"
						placeholder="Введите вопрос..."
						label="Вопрос"
						rows={8}
						textAreaResize={false}
						value={question}
						onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
							setQuestion(e.target.value)
						}
					/>

					<ButtonCustom
						onClick={handleSubmit}
						disabled={loading}
						className={styles['submit-button']}
					>
						{loading ? 'Отправка...' : 'Отправить'}
					</ButtonCustom>

					{successMessage && <p className={styles['success-message']}>{successMessage}</p>}
					{errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
				</div>
			</div>
		</div>
	);
};

export default StudentFaqPage;
