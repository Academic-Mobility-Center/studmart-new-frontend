const ReferalProgramPage = () => {
    return (<>
<div className="flex flex-col gap-[40px]">
    <div 
        className="border bg-[#f8f8f8] box-border 
        flex justify-start items-stretch flex-col grow-0 
        shrink-0 basis-auto pl-5 pr-5 rounded-[15px] 
        border-solid border-[rgba(0,0,0,0.20)] w-[588px]"
    >
        <h3 
            className="font-['Nunito_Sans'] text-[24px] 
            font-extrabold text-[#032c28] m-0 p-0 mt-5"
        >
            Мой счет
        </h3>
        <h1 
            className="font-['Nunito_Sans'] text-[48px] 
            font-extrabold text-[#032c28] m-0 p-0 w-[125%]"
        >
            6 687 руб.
        </h1>
        <button 
            className="bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] 
            uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border 
            grow-0 shrink-0 basis-auto mt-5 rounded-[15px] border-[none]"
        >
            Получить вознаграждение 
        </button>
        <p className="text-[#888888] font-[Mulish] text-center mt-[10px] mb-5">Заявка на выплату отправлена. Мы отправим платеж в течение 2 рабочих дней</p>
    </div>

    <div 
        className="border bg-[#f8f8f8] box-border 
        flex justify-start items-stretch flex-col grow-0 
        shrink-0 basis-auto pl-5 pr-5 rounded-[15px] 
        border-solid border-[rgba(0,0,0,0.20)] w-[588px]"
    >
        <h3 
            className="font-['Nunito_Sans'] text-[24px] 
            font-extrabold text-[#032c28] m-0 p-0 mt-5 mb-5"
        >
            Как работает реферальная система?
        </h3>
        <div className="flex flex-col gap-4 mb-10">
            <p 
                className="text-left font-[Mulish] text-[#032C28]"
            >
                Если ты зарегистрировался в системе, приглашай других студентов
                и зарабатывай бонусные рубли. Просто отправь пользователю ссылку
                или промокод.
            </p>
            <p 
                className="text-left font-[Mulish] text-[#032C28]"
            >
                Если ты зарегистрировался в системе, приглашай других студентов
                и зарабатывай бонусные рубли. Просто отправь пользователю ссылку
                или промокод.
            </p>
            <p 
                className="text-left font-[Mulish] text-[#032C28]"
            >
                Ты за приглашенного получишь 50 рублей, он — 25 рублей.
            </p>
            <p 
                className="text-left font-[Mulish] text-[#032C28]"
            >
                Потратить баллы можно будет с 1 августа.
            </p>            
        </div>
        <div className="flex flex-row gap-6 mb-5">
            <button 
                className="bg-[#F8F8F8] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                uppercase text-[#032c28] min-w-[262px] h-12 cursor-pointer block box-border 
                grow-0 shrink-0 basis-auto rounded-[15px] border border-[rgba(0,0,0,0.20)]"
            >
                Ссылка 
            </button>
            <button 
                className="bg-[#F8F8F8] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                uppercase text-[#032c28] h-12 cursor-pointer block box-border 
                grow-0 shrink-0 basis-auto rounded-[15px] min-w-[262px] border border-[rgba(0,0,0,0.20)]"
            >
                Промокод 
            </button>
        </div>
    </div>
</div>

    </>)
}

export default ReferalProgramPage;