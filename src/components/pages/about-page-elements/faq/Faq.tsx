import FaqItem from "@/components/faq-item/FaqItem";
import { useState } from "react";


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