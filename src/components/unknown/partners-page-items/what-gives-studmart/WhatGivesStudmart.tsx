import Image from 'next/image';

import NeedStudmartItem from '@/components/sections/NeedStudmartItem/NeedStudmartItem';

const WhatGivesStudmart = () => {
	return (
		<div
			className="relative flex justify-start 
        items-stretch flex-col w-[100.00%] 
        box-border mt-[18px]"
		>
			<div
				className="bg-[#8fe248] box-border
            flex justify-start 
            items-stretch flex-col 
            grow-0 shrink-0 basis-auto 
            px-[29px] py-[30px] rounded-[30px]"
			>
				<p
					className="[font-family:'Nunito_Sans',sans-serif]
                text-2xl font-extrabold
                text-[#032c28] grow-0 shrink-0
                basis-auto m-0 p-0"
				>
					Что дает «Студмарт»?
				</p>
				<div
					className="flex justify-between
                    items-start flex-row gap-6 
                    grow-0 shrink-0 basis-auto mt-5 items-stretch relative z-[20]"
				>
					<NeedStudmartItem
						url="/icons/partners/clients.svg"
						title={'Понятная база потенциальных клиентов'}
					>
						Мы уже собрали точную аудиторию — это студенты и <br />
						представители образовательных организаций.
					</NeedStudmartItem>
					<NeedStudmartItem
						url="/icons/partners/chart.svg"
						title={'Анализ ЦА и настроенные рассылки'}
					>
						Можно следить за статистикой предложения: сколько человек
						<br />
						воспользовались, где учатся и чем они увлекаются
					</NeedStudmartItem>
					<NeedStudmartItem url="/icons/partners/graph.svg" title={'Платформа для продвижения'}>
						Мы рекламируем и развиваем свой сервис — параллельно
						<br />
						рассказываем аудитории о бизнесе партнеров.
					</NeedStudmartItem>
					<NeedStudmartItem url="/icons/partners/money.svg" title={'Дешевая регистрация'}>
						<br />
						До 31 декабря 2025 года регистрация бесплатная.
						<br />С 2026-го предложим тарифы: от 40 до 120 000 рублей в год.
					</NeedStudmartItem>
				</div>
				<Image
					src="/icons/partners/what-gives.svg"
					className="absolute bottom-0 right-0 z-[1] -mx-2.5"
					alt=""
					width={448}
					height={137}
				/>
			</div>
		</div>
	);
};
export default WhatGivesStudmart;
