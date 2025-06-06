import { Button } from '@mui/base';

import './style.css';

import Image from 'next/image';
import Link from 'next/link';

const aboutStudmart = 'Про Студмарт';
const studmartDescription =
	'«Студмарт» — это система лояльности. Студентам она предоставляет скидки, а бизнесу — возможность расширить аудиторию.';
interface Props {
	isAuthenticated: boolean;
}
export default function About({ isAuthenticated }: Props) {
	if (isAuthenticated) return null;
	return (
		<div className="loyalty-program-info-container">
			<p className="loyalty-program-heading-style">{aboutStudmart}</p>
			<div className="loyalty-program-info-container1">
				<div className="loyalty-program-container">
					<p className="loyalty-program-description-text-style">{studmartDescription}</p>
					<div className="loyalty-program-details-container">
						<div className="loyalty-program-details-container1">
							<p className="loyalty-program-description">
								После регистрации на платформе учащийся открывает доступ к программам лояльности и
								уникальным акциям. Как получить скидку студента? Подтвердить личность через почту
								вуза и неограниченно выбирать
								<br />
								из каталога выгодные предложения.
							</p>
						</div>
						<div className="promo-card">
							<p className="loyalty-program-description">
								Для предпринимателей продвижение бизнеса через скидки — возможность использовать
								новый канал продаж
								<br />и привлечь аудиторию, которая останется лояльной на долгое время.
							</p>
						</div>
					</div>
					<Link href="registration">
						<Button className="primary-button-style">Зарегистрироваться</Button>
					</Link>
				</div>
				<div className="image-container-flex-row">
					<Image
						src="/icons/About/layout.svg"
						alt=""
						className="image-container"
						width={282}
						height={368}
					/>
					<Image
						src="/icons/About/girl.svg"
						alt=""
						className="image-container-with-blend-mode"
						height={386}
						width={386}
					/>
				</div>
			</div>
		</div>
	);
}
