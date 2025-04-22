import { Button } from "@mui/base"
import Image from "next/image";

interface Props{
    title: string;
    description: string;
    onClick?: () => void;
}

const DiscountBox = ({
    title, 
    description,
    onClick
}: Props) => {
    return (
        <div 
            className="box-border flex 
            justify-start items-start 
            flex-col gap-[30px] w-[588px] 
            grow-0 shrink-0 basis-auto ml-6"
        >
            <div 
                className="border box-border 
                h-[227px] self-stretch grow-0 
                shrink-0 basis-auto overflow-hidden 
                rounded-[30px] border-solid border-[rgba(0,0,0,0.20)]"
            >
                <div className="w-full box-border">
                    <div 
                        className="relative bg-[#f0e9e2] box-border w-full 
                        max-w-[588px] pb-[30px] pl-[30px] rounded-[30px] overflow-hidden"
                    >
                        <Image 
                            src="/icons/offer/lines.svg" 
                            className="absolute top-0 right-0 h-[98px] w-[191px] object-cover z-0 pointer-events-none"
                            alt="Background Decoration"
                        />

                        <div 
                            className="flex justify-start items-stretch 
                            flex-row w-full h-[109px] box-border relative z-10"
                        >
                            <div 
                                className="flex justify-end items-stretch 
                                flex-col grow-0 shrink basis-auto"
                            >
                                <p className="[font-family:'Nunito_Sans',sans-serif] 
                                    text-[24px] font-extrabold text-[#032c28] 
                                    m-0 p-0 tracking-wider proportional-nums 
                                    whitespace-nowrap overflow-hidden text-ellipsis w-full"
                                >
                                    {title}
                                </p>
                                <p 
                                    className="[font-family:Mulish,sans-serif] 
                                    text-sm font-normal text-left text-[#032c28] 
                                    mt-2.5 m-0 p-0"
                                >
                                    {description}
                                </p>
                            </div>
                        </div>

                        <div 
                            className="flex justify-start items-stretch 
                            flex-row h-12 box-border mt-10 relative z-10"
                        >
                            <Button 
                                className="border bg-[#f8f8f8] hover:brightness-90 transition  
                                [font-family:Mulish,sans-serif] 
                                text-sm font-bold tracking-[0.42px] 
                                uppercase text-[#032c28] min-w-[438px] 
                                h-12 w-[438px] cursor-pointer block 
                                box-border grow-0 shrink-0 basis-auto 
                                rounded-[15px] border-solid border-[rgba(0,0,0,0.20)] "
                                onClick={onClick}
                            >
                                Получить скидку
                            </Button>
                            <div 
                                className="border bg-[#f8f8f8] hover:brightness-90 transition 
                                box-border flex justify-center 
                                items-center flex-row gap-2.5 
                                grow-0 shrink-0 basis-auto ml-6 px-6 
                                py-3 rounded-[15px] border-solid 
                                border-[rgba(0,0,0,0.20)]"
                            >
                                <Image 
                                    src="/icons/offer/eye.svg" 
                                    className="w-6 h-6 flex grow-0 
                                    shrink-0 basis-auto box-border cursor-pointer" 
                                    onClick={onClick}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default DiscountBox;