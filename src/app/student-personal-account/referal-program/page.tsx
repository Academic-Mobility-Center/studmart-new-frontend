"use client"
import { useState, useEffect } from "react";
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"
import IStudentFormData from "@/app/student-personal-account/context"
interface ReferalData{
    account: number;
    link: string;
    promocode: string;
}
import { getStudentById } from '@/lib/api/students';
const ReferalProgramPage = () => {
    const { role, id } = useAuth();
    const router = useRouter();
    const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null)

    useEffect(() => {
        if (role && role !== "Student") {
            router.replace("/partner-personal-account");
        }
    }, [role, router]);

    const [formData, setFormData] = useState<ReferalData>({
        account: 0,
        link: "",
        promocode: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const student = await getStudentById(id ?? "");
                if (student) {
                    setFetchStudent(student);
                }
            } catch (e:unknown ) {
                const error = e as { response?: { status: number } };
                if (error?.response?.status === 400) {
                    console.warn("Ошибка 400 при загрузке студентов:", e);
                } else {
                    console.error("Ошибка при загрузке студентов:", e);
                }
                return;
            }
        };
        if (id){
            fetchData();
        }
    }, [id]);
    useEffect(()=>{
        if (!fetchStudent) return
        if (fetchStudent) {
            setFormData({
                account: fetchStudent?.balance,
                link: `https://${process.env.NEXT_PUBLIC_API_URL}/registration?promocode=${fetchStudent.promocode}`,
                promocode: fetchStudent.promocode ?? "some-promo"
            })
        }
    },[fetchStudent])
    const [copiedText, setCopiedText] = useState<"link" | "promocode" | null>(null);
    const [issueRequestVisible, setIssueRequestVisible] = useState(false);
    const [paymentInfoError, setPaymentInfoError] = useState(false);
    const [moneyError, setMoneyError]= useState(false);
    const handleRewardClick = () => {
        if (!fetchStudent?.paymentInformation) {
            setPaymentInfoError(true);
            return;
        }
        if (fetchStudent.balance < 1001){
            setMoneyError(true)
            return
        }
        setPaymentInfoError(false);
        setIssueRequestVisible(true);
    };
    const copyTextToClipboard = async (text: string, type: "link" | "promocode") => {
    try {
        await navigator.clipboard.writeText(text);
        setCopiedText(type);
        setTimeout(() => setCopiedText(null), 2000);
        console.log('Текст успешно скопирован в буфер обмена!');
    } catch (err) {
        console.error('Ошибка:', err);
    }
    };

    return (<>
        <div className="flex flex-col gap-[40px]">
            <div 
                className="border bg-[#f8f8f8] box-border 
                flex justify-start items-stretch flex-col grow-0 
                shrink-0 basis-auto pl-5 pr-5 rounded-[15px] 
                border-solid border-[rgba(0,0,0,0.20)] w-[588px] pb-5"
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
                   {formData?.account} руб.
                </h1>
                <button 
                    className="bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                    uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border 
                    grow-0 shrink-0 basis-auto mt-5 rounded-[15px] border-[none]"
                    onClick={handleRewardClick}
                    >
                    Получить вознаграждение 
                </button>
                {issueRequestVisible && (                <p 
                    className="text-[#888888] font-[Mulish] text-left mt-[10px]" 
                >
                    Заявка на выплату отправлена. Мы отправим платеж в течение 2 рабочих дней
                </p>)}
                {paymentInfoError  && (
                    <p className="text-[#F5052E] font-[Mulish] mt-2">
                        Пожалуйста, заполните банковские реквизиты в профиле, чтобы получить вознаграждение.
                    </p>
                )}
                {moneyError  && (
                    <p className="text-[#F5052E] font-[Mulish] mt-2">
                        Для получения вознаграждения, минимальный баланс счета должен составлять 1000 рублей.
                    </p>
                )}
            </div>

            <div 
                className="border bg-[#f8f8f8] box-border 
                flex justify-start items-stretch flex-col grow-0 
                shrink-0 basis-auto pl-5 pr-5 rounded-[15px] 
                border-solid border-[rgba(0,0,0,0.20)] w-[588px]"
            >

                <h3
                className="font-['Nunito_Sans'] font-extrabold text-[24px] leading-[100%] tracking-[0%]
                            text-[#032c28] mt-5 mb-5  
                            [font-variant-numeric:lining-nums_proportional-nums]"
                >
                Как работает реферальная{'\n'}система?
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
                    <p className="text-left font-[Mulish] text-[#032C28]">Получение вознаграждения будет доступно с 10.01.2026. Для получения вознаграждения, минимальный баланс счета должен составлять 1000 рублей. Максимальная сумма вознаграждения в месяц составляет 4000 рублей</p>
                </div>
                <div className="flex flex-row gap-6 mb-5">
                    <div className="flex flex-col">
                    <button 
                        className="bg-[#F8F8F8] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                        uppercase text-[#032c28] min-w-[262px] h-12 cursor-pointer block box-border 
                        grow-0 shrink-0 basis-auto rounded-[15px] border border-[rgba(0,0,0,0.20)]"
                        onClick={() => copyTextToClipboard(formData?.link, "link")}
                    >
                        Ссылка 
                    </button>
                    {copiedText === "link" && (
                        <p className="text-[#888888] font-[Mulish] text-sm ">
                            Ссылка скопирована
                        </p>
                    )}                          
                    </div>
                    <div className="flex flex-col">
                    <button 
                        className="bg-[#F8F8F8] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                        uppercase text-[#032c28] h-12 cursor-pointer block box-border 
                        grow-0 shrink-0 basis-auto rounded-[15px] min-w-[262px] border border-[rgba(0,0,0,0.20)]"
                        onClick={() => copyTextToClipboard(formData?.promocode, "promocode")}
                    >
                        Промокод 
                    </button>
                    {copiedText === "promocode" && (
                        <p className="text-[#888888] font-[Mulish] text-sm ">
                            Промокод скопирован
                        </p>
                    )}  
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ReferalProgramPage;