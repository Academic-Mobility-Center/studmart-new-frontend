interface Props{
    title: string;
}


const TermsOfUse = ({title}: Props) => {
    return(
        <div className="box-border flex justify-start items-start flex-row gap-2.5 self-stretch grow-0 shrink-0 basis-auto">
        <img src="/icons/offer/dot.svg" className="w-1.5 h-[18px] text-[#032c28] flex grow-0 shrink-0 basis-auto box-border" />
        <p className="[font-family:Mulish,sans-serif] text-sm font-normal text-left text-[#032c28] grow shrink basis-auto m-0 p-0">{title}</p>
    </div>
    )
}

export default TermsOfUse;