import Image from "next/image";

interface Props{
    width: number;
    url: string;
    p1: string;
    p2: string;
    p3: string;
    subtitle?: string
}

const NeedStudmartItem = ({
    width, 
    url,
    p1,
    p2,
    p3,
    subtitle
}: Props) => {
    const widthpx = p1 === "Дешевая" ? "171px": "auto";
    return (
        <div 
        className="bg-[#f8f8f8] box-border 
        flex justify-end items-center 
        flex-col gap-2.5 
        grow-0 shrink-0 basis-auto 
        p-5 rounded-[20px] min-h-[242px]"
        style={{width: `${width}px`}}
    >
        <Image
            alt="" 
            src={url} 
            className="h-[70px]
            max-w-[initial] w-[70px] 
            block grow-0 shrink-0 basis-auto 
            box-border" 
            height={70}
            width={70}    
        />
        <div className="box-border flex justify-start items-center flex-col gap-2.5 self-stretch grow-0 shrink-0 basis-auto">
            <p 
                className="[font-family:Mulish,sans-serif] 
                text-base font-bold text-center text-[#032c28] 
                self-stretch grow-0 shrink-0 
                basis-auto m-0 p-0 h-10"
                style={{width: widthpx}}
            >
                {p1} <br/> {subtitle}
            </p>
            <p 
                className="[font-family:Mulish,sans-serif] 
                text-sm font-normal text-center text-[#032c28] 
                self-stretch grow-0 shrink-0 
                basis-auto m-0 p-0"
            >
                {p2}<br/>{p3}
            </p>
        </div>

    </div>
    )
}

export default NeedStudmartItem;