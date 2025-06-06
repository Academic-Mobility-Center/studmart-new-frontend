import { Button } from '@mui/base';
import Image from 'next/image';

import MarkdownRenderer from '@/components/MarkdownRenderer';

interface Props {
	title: string;
	description: string;
	onClick?: () => void;
	isAuth: boolean;
	role: string | null;
}

const DiscountBox = ({ title, description, onClick, isAuth, role }: Props) => {
	const isStudent = role === 'Student';
	const isButtonDisabled = !isAuth || !isStudent;
	return (
		<div
			className="box-border flex 
            justify-start items-start 
            flex-col gap-[30px] w-[588px] 
            grow-0 shrink-0 basis-auto ml-6"
		>
			<div
				className="border box-border 
                self-stretch grow-0 
                shrink-0 basis-auto overflow-hidden 
                rounded-[30px] border-solid border-[rgba(0,0,0,0.20)]"
			>
				<div className="w-full box-border">
					<div
						className="relative bg-[#f0e9e2] box-border w-full 
                        max-w-[588px] p-[30px] rounded-[30px] overflow-hidden"
					>
						<Image
							src="/icons/offer/lines.svg"
							className="absolute top-0 right-0 h-[98px] w-[191px] object-cover z-0 pointer-events-none"
							alt="Background Decoration"
							height={98}
							width={191}
						/>

						<div className="flex flex-col w-full box-border relative z-10 min-h-[109px]">
							<div className="flex flex-col">
								<p
									className="[font-family:'Nunito_Sans',sans-serif] 
                                    text-[24px] font-extrabold text-[#032c28] 
                                    m-0 p-0
                                    tracking-wider proportional-nums 
                                    break-words overflow-wrap-break-word
                                    w-full leading-tight"
								>
									{title}
								</p>
								<article
									className="[font-family:Mulish,sans-serif] 
                                    text-sm font-normal text-left text-[#032c28] 
                                    mt-2.5 m-0 p-0"
								>
									<MarkdownRenderer content={description} />
								</article>
							</div>
						</div>

						<div
							className="flex items-center 
                            box-border mt-8 relative z-10"
						>
							<Button
								className={`border bg-[#f8f8f8] hover:brightness-90 transition  
                                    [font-family:Mulish,sans-serif] 
                                    text-sm font-bold tracking-[0.42px] 
                                    uppercase text-[#032c28] min-w-[438px] 
                                    h-12 w-[438px] cursor-pointer block 
                                    box-border rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]
                                    ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
								onClick={isStudent ? onClick : undefined}
								// disabled={isButtonDisabled}
							>
								Получить скидку
							</Button>
							<button
								className={`border bg-[#f8f8f8] hover:brightness-90 transition 
                                    box-border flex justify-center 
                                    items-center flex-row gap-2.5 
                                    grow-0 shrink-0 basis-auto ml-4 px-6 
                                    py-3 rounded-[15px] border-solid 
                                    border-[rgba(0,0,0,0.20)]
                                    ${isButtonDisabled ? 'opacity-50 ' : ''}`}
								disabled={!isButtonDisabled}
							>
								<Image
									src="/icons/offer/eye.svg"
									className="w-6 h-6 flex grow-0 
                                    shrink-0 basis-auto box-border cursor-pointer"
									onClick={isStudent ? onClick : undefined}
									alt=""
									width={24}
									height={24}
								/>
							</button>
						</div>
						{!isStudent && (
							<p className="text-sm text-[#032c28] mt-1">
								Получение промокода / скидки доступно только зарегистрированным студентам
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DiscountBox;
