import Link from "next/link";

interface Props{
    name: string;
    link: string;
}
const LinkedMenuItem = ({name, link}: Props) => {
    return(
        <Link  
            href={link}
            className="box-border 
            [font-family:Mulish,sans-serif] 
            text-sm font-normal no-underline 
            text-[#032c28] block h-[18px] 
            self-stretch grow-0 shrink-0 
            basis-auto m-0 p-0"
        >
            {name}
        </Link>
    )
}

export default LinkedMenuItem;