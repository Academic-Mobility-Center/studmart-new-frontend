import Image from "next/image";

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
            className={`border box-border w-full max-w-[588px] 
                rounded-[30px] border-solid border-[rgba(0,0,0,0.20)] 
                transition-all duration-300 cursor-pointer 
                ${isOpen ? "p-6" : "p-[30px] max-h-[100px] overflow-hidden"}`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center w-full">
                <p className="font-mulish text-base font-bold text-[#032c28] m-0 p-0">{heading}</p>
                <Image
                    src="/icons/faq/down.svg"
                    alt=""
                    className={`h-8 w-8 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                    width={32}
                    height={32}
                />
            </div>
            <div
                className={`transition-max-height 
                duration-300 ease-in-out overflow-hidden 
                ${isOpen ? "max-h-[200px]" : "max-h-0"}`}
            >
                <p className="font-mulish text-sm text-[#032c28] mt-[9px] ml-[2px] break-words">
                    {p1}<br />{p2}
                </p>
            </div>
        </div>
    );
};

export default FaqItem;