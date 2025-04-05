import Link from "next/link";

interface Props {
    name: string;
    link: string;
    disabled?: boolean;
}
const LinkedMenuItem = ({ name, link, disabled = false }: Props) => {
    if (disabled) {
        return (
            <span 
                className="box-border 
                [font-family:Mulish,sans-serif] 
                text-sm font-normal no-underline 
                text-[#032c28] block h-[18px] 
                self-stretch grow-0 shrink-0 
                basis-auto m-0 p-0
                opacity-50 cursor-default" // Добавляем opacity и меняем курсор
            >
                {name}
            </span>
        );
    }

    return (
        <Link  
            href={link}
            className="box-border 
            [font-family:Mulish,sans-serif] 
            text-sm font-normal no-underline 
            text-[#032c28] block h-[18px] 
            self-stretch grow-0 shrink-0 
            basis-auto m-0 p-0
            hover:underline" // Добавляем hover эффект
        >
            {name}
        </Link>
    )
}

export default LinkedMenuItem;