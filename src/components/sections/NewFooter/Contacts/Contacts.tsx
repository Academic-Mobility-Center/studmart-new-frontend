import Image from 'next/image';
import Link from 'next/link';

import LinkedMenuItem from '../LinkedMenuItem/LinkedMenuItem';
import styles from './contacts.module.css';

const Contacts = () => {
	return (
		<div className={styles['contacts']}>
			<p className={styles['contacts-title']}>Контакты</p>

			<div className={styles['contacts-list']}>
				<LinkedMenuItem link={'mailto:info@studmart.ru'}>info@studmart.ru</LinkedMenuItem>
				<LinkedMenuItem link={'mailto:support@studmart.ru'}>support@studmart.ru</LinkedMenuItem>
				<LinkedMenuItem link={'tel:+74951471069'}>+7 (495) 147-10-69</LinkedMenuItem>
				<LinkedMenuItem link={'tel:+79199444378'}>+7 919 944-43-78</LinkedMenuItem>
			</div>

			<div className={styles['contacts-socials']}>
				<div className={styles['social-icon-wrapper']}>
					<Link href={'https://vk.com/stud_mart'}>
						<Image
							src="/icons/footer/vk.svg"
							width={40}
							height={40}
							alt="ВКонтакте"
							className={styles['social-icon']}
						/>
					</Link>
				</div>
				<Link href={'https://t.me/studmart'}>
					<Image
						src="/icons/footer/telegram.svg"
						width={40}
						height={40}
						alt="Telegram"
						className={styles['social-icon']}
					/>
				</Link>
			</div>
		</div>
	);
};

export default Contacts;
