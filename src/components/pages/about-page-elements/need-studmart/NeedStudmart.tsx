import NeedStudmartItem from '../need-studmart-item/NeedStudmartItem';
import styles from './NeedStudmart.module.css';

const NeedStudmart = () => {
	return (
		<div className={styles['need-studmart-box']}>
			<p className={styles['need-studmart-title']}>Зачем тебе «Студмарт»?</p>
			<div className={styles['need-studmart-items']}>
				<NeedStudmartItem url="/icons/about/percent.svg" title="Получаешь скидку 5–30%">
					Мы собрали большую базу отечественных
					<br />и иностранных компаний с уникальными скидками. Выбирай.
				</NeedStudmartItem>
				<NeedStudmartItem url="/icons/about/save-money.svg" title="Копишь цифровые рубли">
					Пригласи друга, и мы начислим <br />
					Сможешь обменять их на цифровые или вывести на карту во второй половине 2025-го.
				</NeedStudmartItem>
				<NeedStudmartItem url="/icons/about/money-off.svg" title="Не платишь за доступ">
					Регистрация и сервис абсолютно бесплатные. <br /> Условие одно — быть студентом. <br />
					Можно даже иностранным.
				</NeedStudmartItem>
			</div>
		</div>
	);
};

export default NeedStudmart;
