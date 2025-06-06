import Image from 'next/image';
import Link from 'next/link';

const Contacts = () => {
	return (
		<div
			className="box-border 
            flex justify-start 
            items-start flex-col 
            gap-5 w-[140px] grow-0 
            shrink-0 basis-auto"
		>
			<p
				className="[font-family:Mulish,sans-serif] 
                text-base font-bold text-left text-[#032c28] 
                self-stretch grow-0 shrink-0 basis-auto m-0 p-0"
			>
				Контакты
			</p>

			<div
				className="box-border flex 
                justify-start items-start 
                flex-col gap-2.5 self-stretch 
                grow-0 shrink-0 basis-auto"
			>
				<a
					href="mailto:info@studmart.ru"
					className="box-border 
                    [font-family:Mulish,sans-serif] 
                    text-sm font-normal no-underline 
                    text-[#032c28] block w-[114px] h-[18px] 
                    grow-0 shrink-0 basis-auto m-0 p-0"
				>
					info@studmart.ru
				</a>
				<a
					href="mailto:support@studmart.ru"
					className="box-border 
                    [font-family:Mulish,sans-serif] 
                    text-sm font-normal no-underline 
                    text-[#032c28] block h-[18px] 
                    self-stretch grow-0 shrink-0 
                    basis-auto m-0 p-0"
				>
					support@studmart.ru
				</a>
				<p
					className="box-border 
                    [font-family:Mulish,sans-serif] 
                    text-sm font-normal no-underline 
                    text-[#032c28] block h-[18px] 
                    self-stretch grow-0 shrink-0 
                    basis-auto m-0 p-0"
				>
					+7 (3452) 65-84-24
				</p>
			</div>

			<div
				className="box-border 
                flex justify-start items-start 
                flex-row gap-5 grow-0 shrink-0 
                basis-auto"
			>
				<div
					className="box-border flex 
                    justify-center items-stretch 
                    flex-col w-10 h-10 grow-0 shrink-0 
                    basis-auto overflow-hidden"
				>
					<Link href={'https://vk.com/stud_mart'}>
						<Image
							src="/icons/footer/vk.svg"
							width={40}
							height={40}
							alt=""
							className="h-10 max-w-[initial] 
                        block grow-0 shrink-0 basis-auto"
						/>
					</Link>
				</div>
				<Link href={'https://t.me/studmart'}>
					<Image
						src="/icons/footer/telegram.svg"
						width={40}
						height={40}
						alt=""
						className="h-10 max-w-[initial] 
                        w-10 block grow-0 shrink-0 basis-auto 
                        box-border overflow-hidden"
					/>
				</Link>
			</div>
		</div>
	);
};

export default Contacts;
