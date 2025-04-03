import { Button } from "@mui/base"

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
                <div 
                    className="w-[100.00%] box-border"
                >
                    <div 
                        className="bg-[#f0e9e2] box-border w-[100.00%] 
                        max-w-[588px] pb-[30px] pl-[30px] rounded-[30px] "
                    >
                        <div 
                            className="flex justify-start 
                            items-stretch flex-row w-[100.00%] 
                            h-[109px] box-border"
                        >
                            <div 
                                className="flex justify-end 
                                items-stretch flex-col grow-0 
                                shrink basis-auto relative z-20"
                            >
                                <p className="[font-family:'Nunito_Sans',sans-serif] 
                                    text-[24px] font-extrabold text-[#032c28] 
                                    grow-0 shrink-0 basis-auto m-0 p-0"
                                >
                                    {title}
                                </p>
                                <p 
                                    className="[font-family:Mulish,sans-serif] 
                                    text-sm font-normal text-left text-[#032c28] 
                                    grow-0 shrink-0 basis-auto mt-2.5 m-0 p-0"
                                >
                                    {description}
                                </p>
                            </div>
                            <img 
                                src="/icons/offer/lines.svg" 
                                className="h-[98px] max-w-[initial] 
                                object-cover w-[191px] box-border 
                                block ml-[-52px] border-[none] relative z-1" 
                            />
                        </div>
                        <div 
                            className="flex justify-start 
                            items-stretch flex-row h-12
                            box-border mt-10"
                        >
                            <Button 
                                className="border bg-[#f8f8f8] 
                                [font-family:Mulish,sans-serif] 
                                text-sm font-bold tracking-[0.42px] 
                                uppercase text-[#032c28] min-w-[438px] 
                                h-12 w-[438px] cursor-pointer block 
                                box-border grow-0 shrink-0 basis-auto 
                                rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]"
                                onClick={onClick}
                            >
                            Получить скидку
                            </Button>
                            <div 
                                className="border bg-[#f8f8f8] 
                                box-border flex justify-center 
                                items-center flex-row gap-2.5 
                                grow-0 shrink-0 basis-auto ml-6 px-6 
                                py-3 rounded-[15px] border-solid 
                                border-[rgba(0,0,0,0.20)]"
                            >
                                <img 
                                    src="/icons/offer/eye.svg" 
                                    className="w-6 h-6 flex grow-0 
                                    shrink-0 basis-auto box-border cursor-pointer" 
                                    onClick={onClick}
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