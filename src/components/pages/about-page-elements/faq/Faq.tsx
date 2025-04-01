import { useState } from "react";

interface Props {
    heading: string;
    p1: string;
    p2: string;
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem = ({ p1, p2, heading, isOpen, onClick }: Props) => {
    return (
        <div
            className={`border box-border w-full max-w-[588px] rounded-[30px] border-solid border-[rgba(0,0,0,0.20)] transition-all duration-300 cursor-pointer ${isOpen ? "p-6" : "p-[30px] max-h-[100px] overflow-hidden"}`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center w-full">
                <p className="font-mulish text-base font-bold text-[#032c28] m-0 p-0">{heading}</p>
                <img
                    src="/icons/faq/down.svg"
                    alt=""
                    className={`h-8 w-8 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                />
            </div>
            <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[200px]" : "max-h-0"}`}
            >
                <p className="font-mulish text-sm text-[#032c28] mt-[9px]">
                    {p1}<br />{p2}
                </p>
            </div>
        </div>
    );
};

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems = [
        {
            heading: "Кто может пользоваться «Студмартом»?",
            p1: "Действующий студент университета РФ — понадобится только e-mail",
            p2: "от вуза. Если такой почты нет, мы попросим прикрепить доказательства: фото студенческого и селфи или справку от деканата."
        },
        {
            heading: "Не могу зарегистрироваться с e-mail от вуза. Что делать?",
            p1: "Если у вас нет e-mail от вуза, вы можете прикрепить фото студенческого билета.",
            p2: "Также принимается справка от деканата."
        },
        {
            heading: "«Студмарт» — это бесплатно?",
            p1: "Да, регистрация и использование сервиса абсолютно бесплатны.",
            p2: "Вы платите только за товары и услуги, которые приобретаете."
        },
        {
            heading: "Что делать, если скидка не работает или компания отказывается предоставить скидку?",
            p1: "Свяжитесь с нашей поддержкой, и мы разберемся с ситуацией.",
            p2: "Вы можете написать нам через форму обратной связи."
        }
    ];

    return (
        <div className="w-full mt-[97px]">
            <p className="font-nunito text-4xl font-extrabold tracking-[1.08px] leading-9 text-[#032c28]">FAQ</p>
            <div className="grid grid-cols-2 gap-[30px] mt-10">
                {faqItems.map((item, index) => (
                    <FaqItem
                        key={index}
                        heading={item.heading}
                        p1={item.p1}
                        p2={item.p2}
                        isOpen={openIndex === index}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Faq;