
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
            <p  className="box-border 
                [font-family:Mulish,sans-serif] 
                text-sm font-normal no-underline 
                text-[#032c28] block h-[18px] 
                self-stretch grow-0 shrink-0 
                basis-auto m-0 p-0"
            >
                +7 (495) 147-10-69
            </p>
            <p  className="box-border 
                [font-family:Mulish,sans-serif] 
                text-sm font-normal no-underline 
                text-[#032c28] block h-[18px] 
                self-stretch grow-0 shrink-0 
                basis-auto m-0 p-0"
            >
                +7 919 944-43-78
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
                <img 
                    src="/icons/footer/vk.svg" 
                    alt="" className="h-10 max-w-[initial] 
                    block grow-0 shrink-0 basis-auto" 
                />
            </div>
            <img 
                src="/icons/footer/telegram.svg" 
                alt="" className="h-10 max-w-[initial] 
                w-10 block grow-0 shrink-0 basis-auto 
                box-border overflow-hidden" /
            >
        </div>  
    </div>
    )
}

export default Contacts;