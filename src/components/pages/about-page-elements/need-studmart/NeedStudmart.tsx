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
                    <div 
                        className="bg-[#f8f8f8] box-border 
                        flex justify-end items-center 
                        flex-col gap-2.5 w-[364px] 
                        grow-0 shrink-0 basis-auto 
                        p-5 rounded-[20px]"
                    >
                        <img 
                            src="/icons/about/percent.svg"  
                            alt="" className="h-[100px]
                            max-w-[initial] w-[100px] 
                            block grow-0 shrink-0 basis-auto 
                            box-border" 
                        />
                            <p 
                                className="[font-family:Mulish,sans-serif] 
                                text-base font-bold text-center text-[#032c28] 
                                self-stretch grow-0 shrink-0 
                                basis-auto m-0 p-0"
                            >
                                Получаешь скидку 5–30%
                            </p>
                            <p 
                                className="[font-family:Mulish,sans-serif] 
                                text-sm font-normal text-center text-[#032c28] 
                                self-stretch grow-0 shrink-0 
                                basis-auto m-0 p-0"
                            >
                                Мы собрали большую базу отечественных
                                <br />и иностранных компаний с уникальными скидками. Выбирай.
                            </p>
                    </div>
                    <div 
                        className="bg-[#f8f8f8] box-border 
                        flex justify-end items-center 
                        flex-col gap-2.5 w-[364px] 
                        grow-0 shrink-0 basis-auto 
                        p-5 rounded-[20px]"
                    >
                        <img 
                            src="/icons/about/save-money.svg"  
                            alt="" className="h-[100px]
                            max-w-[initial] w-[100px] 
                            block grow-0 shrink-0 basis-auto 
                            box-border" 
                        />
                            <p 
                                className="[font-family:Mulish,sans-serif] 
                                text-base font-bold text-center text-[#032c28] 
                                self-stretch grow-0 shrink-0 
                                basis-auto m-0 p-0"
                            >
                                Копишь цифровые рубли
                            </p>
                            <p 
                                className="[font-family:Mulish,sans-serif] 
                                text-sm font-normal text-center text-[#032c28] 
                                self-stretch grow-0 shrink-0 
                                basis-auto m-0 p-0"
                            >
                                Пригласи друга, и мы начислим 
                                <br />Сможешь обменять их на цифровые или вывести на карту во второй половине 2025-го.
                            </p>
                    </div>
                    <div 
                        className="bg-[#f8f8f8] box-border 
                        flex justify-end items-center 
                        flex-col gap-2.5 w-[364px] 
                        grow-0 shrink-0 basis-auto 
                        p-5 rounded-[20px]"
                    >
                        <img 
                            src="/icons/about/money-off.svg"  
                            alt="" className="h-[100px]
                            max-w-[initial] w-[100px] 
                            block grow-0 shrink-0 basis-auto 
                            box-border" 
                        />
                            <p 
                                className="[font-family:Mulish,sans-serif] 
                                text-base font-bold text-center text-[#032c28] 
                                self-stretch grow-0 shrink-0 
                                basis-auto m-0 p-0"
                            >
                                Не платишь за доступ
                            </p>
                            <p 
                                className="[font-family:Mulish,sans-serif] 
                                text-sm font-normal text-center text-[#032c28] 
                                self-stretch grow-0 shrink-0 
                                basis-auto m-0 p-0"
                            >
                                Регистрация и сервис абсолютно бесплатные. 
                                <br />Условие одно — быть студентом.
                                Можно даже иностранным.
                            </p>
                    </div>
                </div>
        </div>
    </div>
    )
}
export default NeedStudmart;