import Star from '@/public/icons/ContentLayoutWidget/Star';

import './style.css';

// Интерфейс для пропсов компонента
interface Props {
	category: 'academic' | 'treats' | 'cosmetics' | 'delivery' | 'golden-apple'; // Определение возможных категорий
}

const StylishWrapper: React.FC<Props> = ({ category }) => {
	return (
		<div className={`div-style-8fa69c0f ${category}`}>
			<Star className="div-style-46e88b05" />
		</div>
	);
};

export default StylishWrapper;
