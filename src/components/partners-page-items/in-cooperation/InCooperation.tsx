import Image from "next/image";

const InCooperation = () => {
    return (
        <div className="flex justify-start items-start flex-row w-[100.00%] box-border">
            <div className="flex justify-start items-stretch flex-col grow shrink-0 basis-auto pb-[25px]">
            <div className="grow-0 shrink-0 basis-auto pr-8">
                <p className="bg-[#ffb9ff] box-border [font-family:'Nunito_Sans',sans-serif] text-5xl font-extrabold tracking-[1.44px] leading-[48px] text-[#032c28] w-[100.00%] m-0 pt-10 pb-[100px] px-[39px] p-0 rounded-[30px]">
                    О сотрудничестве с нами
                </p>
            </div>
            <div className="mt-[-70px] self-end grow-0 shrink-0 basis-auto">
                <Image 
                alt="" 
                src="/icons/partners/what-gives.svg" 
                className="h-[127px] max-w-[initial] object-cover w-[411px] box-border block border-[none]" 
                width={411}
                height={127}
                />
            </div>
            <div className="mt-[-107px] grow-0 shrink-0 basis-auto px-10">
                <div className="bg-[#fee200] box-border flex justify-center items-center flex-row gap-2.5 w-[504px] px-[30px] py-5 rounded-[30px]">
                <p className="[font-family:Mulish,sans-serif] text-xl font-bold text-left text-[#032c28] grow shrink basis-auto m-0 p-0">
                    Как привлечь постоянных клиентов и стать известнее? Присоединиться к программе
                </p>
                </div>
            </div>
            </div>
            <Image src="/icons/partners/main.svg" alt="" className="h-[231px] max-w-[initial] w-[268px] block box-border ml-[1.25px]" height={231} width={268}/>
        </div>
    )
}

export default InCooperation;