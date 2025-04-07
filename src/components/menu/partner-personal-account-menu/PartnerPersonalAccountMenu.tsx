const StudentPersonalAccountMenu = () => {
    return(<>
                        <div className="flex flex-col w-[322px] gap-5 self-start pl-[40px] ">
                        <div className="border bg-[#f8f8f8] rounded-[15px] border-solid border-[rgba(0,0,0,0.20)] overflow-hidden">
                            <button className="w-full flex items-center gap-2.5 px-[19px] py-3 hover:bg-[#efefef] transition-colors">
                                <img src="/icons/partner-account/profile.svg" className="w-6 h-6" />
                                <span className="font-mulish text-sm font-normal text-[#032c28]">Профиль партнера</span>
                            </button>
                            <div className="w-full h-px bg-[rgba(0,0,0,0.20)]" />
                                <button className="w-full flex items-center gap-2.5 px-[19px] py-3 hover:bg-[#efefef] transition-colors">
                                    <img src="/icons/partner-account/shopping.svg" className="w-6 h-6" />
                                    <span className="font-mulish text-sm font-normal text-[#032c28]">Предложения</span>
                                </button>
                            <div className="w-full h-px bg-[rgba(0,0,0,0.20)]" />

                                <button className="w-full flex items-center gap-2.5 px-[19px] py-3 hover:bg-[#efefef] transition-colors">
                                    <img src="/icons/partner-account/charts.svg" className="w-6 h-6" />
                                    <span className="font-mulish text-sm font-normal text-[#032c28]">Статистика</span>
                                </button>
                            
                            <div className="w-full h-px bg-[rgba(0,0,0,0.20)]" />
                            
                            <button className="w-full flex items-center gap-2.5 px-[19px] py-3 hover:bg-[#efefef] transition-colors">
                                <img src="/icons/partner-account/docs.svg" className="w-6 h-6" />
                                <span className="font-mulish text-sm font-normal text-[#032c28]">Документы</span>
                            </button>
                            
                            <div className="w-full h-px bg-[rgba(0,0,0,0.20)]" />
                            
                            <button className="w-full flex items-center gap-2.5 px-[19px] py-3 hover:bg-[#efefef] transition-colors">
                                <img src="/icons/partner-account/faq.svg" className="w-6 h-6" />
                                <span className="font-mulish text-sm font-normal text-[#032c28]">FAQ</span>
                            </button>
                        </div>
                        <button className="border bg-[#f8f8f8] font-mulish text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] w-full h-12 cursor-pointer rounded-[15px] border-solid border-[rgba(0,0,0,0.20)] hover:bg-[#efefef] transition-colors">
                            Выйти из аккаунта
                        </button>
                    </div>
    </>)
}
export default StudentPersonalAccountMenu;