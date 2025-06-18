'use client';

import { useEffect, useState } from 'react';

import ButtonCustom from '@/components/ui/ButtonCustom';
import IStudentFormData from '@/app/(student)/student-personal-account/context';
import { useAuth } from '@/context/AuthContext';
import { getStudentById } from '@/lib/api/students';

import styles from './StudentReferralProgramPage.module.css';

interface IReferralData {
	account: number;
	link: string;
	promocode: string;
}

const StudentReferralProgramPage = () => {
	const { id } = useAuth();
	const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null);

	const [formData, setFormData] = useState<IReferralData>({
		account: 0,
		link: '',
		promocode: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const student = await getStudentById(id ?? '');
				if (student) {
					setFetchStudent(student);
				}
			} catch (e: unknown) {
				const error = e as { response?: { status: number } };
				if (error?.response?.status === 400) {
					console.warn('Ошибка 400 при загрузке студентов:', e);
				} else {
					console.error('Ошибка при загрузке студентов:', e);
				}
				return;
			}
		};
		if (id) {
			fetchData();
		}
	}, [id]);

	useEffect(() => {
		if (!fetchStudent) return;
		if (fetchStudent) {
			setFormData({
				account: fetchStudent?.balance,
				link: `https://${process.env.NEXT_PUBLIC_API_URL}/registration?promocode=${fetchStudent.promocode}`,
				promocode: fetchStudent.promocode ?? 'some-promo',
			});
		}
	}, [fetchStudent]);

	const [copiedText, setCopiedText] = useState<'link' | 'promocode' | null>(null);
	const [issueRequestVisible, setIssueRequestVisible] = useState(false);
	const [paymentInfoError, setPaymentInfoError] = useState(false);
	const [moneyError, setMoneyError] = useState(false);

	const handleRewardClick = () => {
		if (!fetchStudent?.paymentInformation) {
			setPaymentInfoError(true);
			return;
		}
		if (fetchStudent.balance < 1001) {
			setMoneyError(true);
			return;
		}
		setPaymentInfoError(false);
		setIssueRequestVisible(true);
	};

	const copyTextToClipboard = async (text: string, type: 'link' | 'promocode') => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(type);
			setTimeout(() => setCopiedText(null), 2000);
			console.log('Текст успешно скопирован в буфер обмена!');
		} catch (err) {
			console.error('Ошибка:', err);
		}
	};

	return (
		<div className={styles['page-container']}>
			<div className={styles.card}>
				<h1 className={styles['card-title']}>Мой счет</h1>
				<h2 className={styles['card-balance']}>{formData?.account} руб.</h2>
				<ButtonCustom className={styles['reward-button']} onClick={handleRewardClick}>
					Получить вознаграждение
				</ButtonCustom>
				{issueRequestVisible && (
					<p className={styles['info-text']}>
						Заявка на выплату отправлена. Мы отправим платеж в течение 2 рабочих дней
					</p>
				)}
				{paymentInfoError && (
					<p className={styles['error-text']}>
						Пожалуйста, заполните банковские реквизиты в профиле, чтобы получить вознаграждение.
					</p>
				)}
				{moneyError && (
					<p className={styles['error-text']}>
						Для получения вознаграждения, минимальный баланс счета должен составлять 1000 рублей.
					</p>
				)}
			</div>

			<div className={styles.card}>
				<h3 className={styles['card-title']}>Как работает реферальная система?</h3>
				<div className={styles['description-text-group']}>
					<p className={styles['description-text']}>
						Если ты зарегистрировался в системе, приглашай других студентов и зарабатывай бонусные
						рубли. Просто отправь пользователю ссылку или промокод.
					</p>
					<p className={styles['description-text']}>
						Если ты зарегистрировался в системе, приглашай других студентов и зарабатывай бонусные
						рубли. Просто отправь пользователю ссылку или промокод.
					</p>
					<p className={styles['description-text']}>
						Ты за приглашенного получишь 50 рублей, он — 25 рублей.
					</p>
					<p className={styles['description-text']}>
						Получение вознаграждения будет доступно с 10.01.2026. Для получения вознаграждения,
						минимальный баланс счета должен составлять 1000 рублей. Максимальная сумма
						вознаграждения в месяц составляет 4000 рублей
					</p>
				</div>
				<div className={styles['copy-buttons-row']}>
					<div className={styles['copy-button-wrapper']}>
						<ButtonCustom
							customType="white"
							className={styles['copy-button']}
							onClick={() => copyTextToClipboard(formData?.link, 'link')}
						>
							Ссылка
						</ButtonCustom>
						{copiedText === 'link' && <p className={styles['copy-info']}>Ссылка скопирована</p>}
					</div>
					<div className={styles['copy-button-wrapper']}>
						<ButtonCustom
							customType="white"
							className={styles['copy-button']}
							onClick={() => copyTextToClipboard(formData?.promocode, 'promocode')}
						>
							Промокод
						</ButtonCustom>
						{copiedText === 'promocode' && (
							<p className={styles['copy-info']}>Промокод скопирован</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentReferralProgramPage;
