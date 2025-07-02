import Link from 'next/link';

import ButtonCustom from '@/components/ui/ButtonCustom';

export default function NotFound() {
	return (
		<div className="mt-[40px]">
			<h1 className="text-[32px] font-bold mb-4">Такой страницы не существует</h1>
			<Link href={'/'}>
				<ButtonCustom customType="white">Вернуться на главную</ButtonCustom>
			</Link>
		</div>
	);
}
