interface Props{
    width: number;
    url: string;
    p1: string;
    p2: string;
    p3: string;
}

const NeedStudmartItem = ({
    width, 
    url,
    p1,
    p2,
    p3,
}: Props) => {
    return (
        <div 
        className="bg-[#f8f8f8] box-border 
        flex justify-end items-center 
        flex-col gap-2.5 
        grow-0 shrink-0 basis-auto 
        p-5 rounded-[20px] min-h-[242px]"
        style={{width: `${width}px`}}
    >
        <img 
            src={url} 
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
                {p1}
            </p>
            <p 
                className="[font-family:Mulish,sans-serif] 
                text-sm font-normal text-center text-[#032c28] 
                self-stretch grow-0 shrink-0 
                basis-auto m-0 p-0"
            >
                {p2}<br />{p3}
            </p>
    </div>
    )
}

export default NeedStudmartItem;