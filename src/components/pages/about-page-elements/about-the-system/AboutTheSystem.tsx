import Image from 'next/image';

const AboutTheSystem = () => {
	return (
		<div
			className="flex justify-start 
        items-start flex-row 
        w-[100.00%] box-border"
		>
			<div className="grow shrink-0 basis-auto pb-[52px]">
				<p
					className="bg-[#fee200] box-border 
                [font-family:'Nunito_Sans',sans-serif] 
                text-5xl font-extrabold tracking-[1.44px] 
                leading-[48px] text-[#032c28] w-[100.00%] 
                m-0 pt-10 pb-[100px] px-[39px] p-0 rounded-[30px]"
				>
					О системе и выгодах
				</p>
				<div className="mt-[-60px] px-10">
					<div
						className="bg-[#ffb9ff] box-border 
                    flex justify-start items-center 
                    flex-row gap-2.5 w-[656px] 
                    px-[30px] py-5 rounded-[30px]"
					>
						<p
							className="[font-family:Mulish,sans-serif] 
                        text-xl font-bold text-left text-[#032c28] 
                        grow shrink basis-auto m-0 p-0"
						>
							Зарегистрируйся через почту вуза и получи доступ
							<br />к каталогу скидок от иностранных и российских компаний
						</p>
					</div>
				</div>
			</div>
			<Image
				height={231}
				width={268}
				src="/icons/about/main-screen.svg"
				alt=""
				className="h-[231px] max-w-[initial] 
            w-[268px] block box-border ml-[33px]"
			/>
		</div>
	);
};

export default AboutTheSystem;
