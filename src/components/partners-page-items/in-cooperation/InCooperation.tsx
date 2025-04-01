const InCooperation = () => {
    return (
    <div 
        className="flex justify-start 
        items-start flex-row 
        w-[100.00%] box-border"
    >
        <div className="grow shrink-0 basis-auto pb-[52px]">
            <p 
                className="bg-[#FFB9FF] box-border 
                [font-family:'Nunito_Sans',sans-serif] 
                text-5xl font-extrabold tracking-[1.44px] 
                leading-[48px] text-[#032c28] w-[100.00%] 
                m-0 pt-10 pb-[100px] px-[39px] p-0 rounded-[30px]"
            >
                О сотрудничестве с нами
            </p>
            <div className="mt-[-70px] self-end grow-0 shrink-0 basis-auto">
                <img src="/icons/partners/what-gives.svg" className="h-[127px] max-w-[initial] object-cover w-[411px] box-border block border-[none]" />
            </div>
            {/* <img src="/icons/partners/what-gives.svg" className="bottom-0 right-0 pl-[400px] pb-[20px]"/> */}
            <div className="mt-[-60px] px-10">
                <div 
                    className="bg-[#FEE200] box-border 
                    flex justify-start items-center 
                    flex-row gap-2.5 w-[656px] 
                    px-[30px] py-5 rounded-[30px]"
                >
                    <p 
                        className="[font-family:Mulish,sans-serif] 
                        text-xl font-bold text-left text-[#032c28] 
                        grow shrink basis-auto m-0 p-0"
                    >
                    Как привлечь постоянных клиентов и стать
                    <br />известнее? Присоединиться к программе
                    </p>
                </div>
            </div>
        </div>
        <img 
            src="/icons/partners/main.svg" 
            alt="" 
            className="h-[231px] max-w-[initial] 
            w-[268px] block box-border ml-[33px]" 
        />
    </div>
    )
}

export default InCooperation;