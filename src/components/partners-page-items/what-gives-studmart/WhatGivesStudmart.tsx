import Image from 'next/image';

import NeedStudmartItem from '@/components/pages/about-page-elements/need-studmart-item/NeedStudmartItem';

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
						width={267}
						p1={'Понятная база потенциальных клиентов'}
						p2={'Мы уже собрали точную аудиторию — это студенты и '}
						p3={'представители образовательных организаций.'}
					/>
					<NeedStudmartItem
						url="/icons/partners/chart.svg"
						width={267}
						p1={'Анализ ЦА и настроенные рассылки'}
						p2={'Можно следить за статистикой предложения: сколько человек'}
						p3={'воспользовались, где учатся и чем они увлекаются'}
					/>
					<NeedStudmartItem
						url="/icons/partners/graph.svg"
						width={267}
						p1={'Платформа для продвижения'}
						p2={'Мы рекламируем и развиваем свой сервис — параллельно '}
						p3={'рассказываем аудитории о бизнесе партнеров.'}
					/>
					<div className="bg-[#f8f8f8] box-border flex justify-start items-center flex-col gap-2.5 w-[267px] grow-0 shrink-0 basis-auto p-5 rounded-[20px]">
						<Image
							src="/icons/partners/money.svg"
							alt=""
							className="h-[70px] max-w-[initial] w-[70px] block grow-0 shrink-0 basis-auto box-border"
							width={70}
							height={70}
						/>
						<div className="box-border flex justify-start items-center flex-col gap-2.5 self-stretch grow-0 shrink-0 basis-auto">
							<p className="[font-family:Mulish,sans-serif] text-base font-bold text-center text-[#032c28] w-[171px] h-10 grow-0 shrink-0 basis-auto box-border m-0 p-0">
								Дешевая регистрация
							</p>
							<p className="[font-family:Mulish,sans-serif] text-sm font-normal text-center text-[#032c28] self-stretch grow-0 shrink-0 basis-auto m-0 p-0">
								До 31 декабря 2025 года регистрация бесплатная.
								<br />С 2026-го предложим тарифы: от 40 до 120 000 рублей в год.
							</p>
						</div>
					</div>
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
