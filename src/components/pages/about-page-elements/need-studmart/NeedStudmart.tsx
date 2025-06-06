import NeedStudmartItem from '../need-studmart-item/NeedStudmartItem';

const NeedStudmart = () => {
	return (
		<div
			className="flex justify-start 
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
					Зачем тебе «Студмарт»?
				</p>
				<div
					className="flex justify-between
                    items-start flex-row gap-6 
                    grow-0 shrink-0 basis-auto mt-5"
				>
					<NeedStudmartItem
						url="/icons/about/percent.svg"
						width={364}
						p1={'Получаешь скидку 5–30%'}
						p2={'Мы собрали большую базу отечественных'}
						p3={'и иностранных компаний с уникальными скидками. Выбирай.'}
					/>
					<NeedStudmartItem
						url="/icons/about/save-money.svg"
						width={364}
						p1={'Копишь цифровые рубли'}
						p2={'Пригласи друга, и мы начислим'}
						p3={'Сможешь обменять их на цифровые или вывести на карту во второй половине 2025-го.'}
					/>
					<NeedStudmartItem
						url="/icons/about/money-off.svg"
						width={364}
						p1={'Не платишь за доступ'}
						p2={'Регистрация и сервис абсолютно бесплатные.'}
						p3={'Условие одно — быть студентом.Можно даже иностранным.'}
					/>
				</div>
			</div>
		</div>
	);
};
export default NeedStudmart;
