'use client';

import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CardBrown from '@/components/ui/CardBrown';
import Loader from '@/components/ui/Loader';

import { getStudentById } from '@/lib/api/students';

import { useAuth } from '@/context/AuthContext';
import IStudentFormData from '@/context/StudentPersonalContext';

import styles from './StudIdPage.module.css';

const StudIdPage: React.FC = () => {
	const { role, id } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (role && role !== 'Student') {
			router.replace('/partner-personal-account');
		}
	}, [role, router]);

	const [image, setImage] = useState(
		'/icons/student-account/d4eeae509bbfb902288411fb819999c2.jpeg',
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isStudentLoading, setStudentLoading] = useState(false);
	const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setIsLoading(true);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result as string);
				setIsLoading(false);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setStudentLoading(true);
				const student = await getStudentById(id ?? '');
				if (student) setFetchStudent(student);
				setStudentLoading(false);
			} catch (e: unknown) {
				const error = e as { response?: { status: number } };
				if (error?.response?.status === 400) {
					console.warn('Ошибка 400 при загрузке студентов:', e);
				} else {
					console.error('Ошибка при загрузке студентов:', e);
				}
			}
		};
		if (id) fetchData();
	}, [id]);

	const date = new Date();
	const year = date.getFullYear() + (fetchStudent?.course?.yearsBeforeEnding || 0);

	const userData = {
		firstName: fetchStudent?.firstName,
		lastName: fetchStudent?.lastName,
		university: {
			shortName: fetchStudent?.university?.shortName,
			name: fetchStudent?.university?.name,
		},
		course: {
			name: fetchStudent?.course?.name,
			yearsBeforeEnding: year,
		},
	};
	if (isStudentLoading) return <Loader />;
	return (
		<CardBrown className={styles['card']}>
			<div className={clsx(styles['corner-lines'], styles['corner-lines-up'])}>
				<Image alt="lines" src="/icons/student-account/lines.png" fill />
			</div>
			<div className={clsx(styles['corner-lines'], styles['corner-lines-down'])}>
				<Image alt="lines" src="/icons/student-account/lines.png" fill />
			</div>

			<div className={styles['content']}>
				<div className={styles['photo']} style={{ backgroundImage: `url(${image})` }}>
					<label htmlFor="image-upload" className={styles['upload-button']}>
						{isLoading ? (
							<div className={styles['spinner']} />
						) : (
							<Image
								alt=""
								className={styles['camera-icon']}
								src="/icons/student-account/camera.svg"
								width={24}
								height={24}
							/>
						)}
					</label>
					<input
						id="image-upload"
						type="file"
						className={styles['hidden-input']}
						onChange={handleImageUpload}
					/>
				</div>
				<div className={styles['info']}>
					<div className={styles['info-block']}>
						<p className={styles['label']}>Имя и фамилия</p>
						<p className={styles['value']}>
							{userData.firstName} {userData.lastName}
						</p>
					</div>
					<div className={styles['info-block']}>
						<p className={styles['label']}>Университет</p>
						<p className={styles['value']}>{userData.university.name}</p>
					</div>
					<div className={styles['info-block']}>
						<p className={styles['label']}>Год окончания</p>
						<p className={styles['value']}>{userData?.course?.yearsBeforeEnding}</p>
					</div>
				</div>
			</div>
			<Link href="profile" className={styles['edit-link']}>
				<div className={styles['edit-button']}>
					<Image
						className={styles['edit-icon']}
						alt=""
						src="/icons/student-account/edit-square.svg"
						width={32}
						height={32}
					/>
					<p className={styles['edit-text']}>Редактировать</p>
				</div>
			</Link>
		</CardBrown>
	);
};
export default StudIdPage;
