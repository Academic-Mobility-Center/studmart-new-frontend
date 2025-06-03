// import React from "react";

// interface EmployeePromocode {
//   id: string;
//   name: string;
//   description: string;
//   size: number;
//   promocodeValue: string;
//   partner: {
//     id: string;
//     companyName: string;
//     subtitle: string;
//     maxDiscount: number;
//     isFixed: boolean;
//   };
//   hasAllRegions: boolean;
//   regions: [];
// }

// interface PersonalPromocode {
//   student: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     university: {
//       id: number;
//       name: string;
//     };
//   };
//   discount: {
//     id: string;
//     name: string;
//     description: string;
//     size: number;
//     promocodeValue: string | null;
//     partner: {
//       id: string;
//       companyName: string;
//       subtitle: string;
//       maxDiscount: number;
//       isFixed: boolean;
//       category: {
//         id: number;
//         name: string;
//       };
//     };
//     hasAllRegions: boolean;
//     regions: [];
//   };
//   promocode: string;
// }

// interface Props {
//   isOpen: boolean;
//   closeModal: () => void;
//   promoCode?: PersonalPromocode | EmployeePromocode;
// }

// const DiscountModal: React.FC<Props> = ({ isOpen, closeModal, promoCode }) => {
//   if (!isOpen || !promoCode) return null;

//   const isEmployee = !("discount" in promoCode);

//   const name = isEmployee ? promoCode.name : promoCode.discount.name;
//   const description = isEmployee ? promoCode.description : promoCode.discount.description;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0, left: 0, right: 0, bottom: 0,
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 1000,
//       }}
//       onClick={closeModal}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           backgroundColor: "#fff",
//           borderRadius: "10px",
//           padding: "20px",
//           maxWidth: "500px",
//           width: "90%",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//         }}
//       >
//         <h2 style={{ marginTop: 0 }}>{name}</h2>
//         <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>

//         <button
//           onClick={closeModal}
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             border: "none",
//             backgroundColor: "#8fe248",
//             cursor: "pointer",
//             borderRadius: "5px",
//             fontWeight: "bold",
//           }}
//         >
//           Закрыть
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DiscountModal;
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react"
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PersonalPromocode from "../../../../types/PersonalPromocode"

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    promoCode?: PersonalPromocode; // Принимаем объект промокода
}

export const DiscountModal: React.FC<Props> = ({ isOpen, closeModal, promoCode }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (promoCode?.promocode) {
            navigator.clipboard.writeText(promoCode.promocode).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 flex items-center justify-center z-50">
            <div className="backdrop-blur-[5px] bg-[rgba(0,0,0,0.10)] fixed inset-0" onClick={closeModal}></div>
            <div className="relative bg-[#f0e9e2] border border-[rgba(0,0,0,0.20)] rounded-[30px] pt-[30px] px-[29px] w-[588px] shadow-lg">
                <div className="w-full">
                    <p className="text-[24px] font-extrabold text-[#032c28] m-0 p-0 tracking-widest">
                        {promoCode?.discount.name || "Промокод"}
                    </p>
                    <article className="text-sm text-[#032c28] mt-2.5 max-w-[370px]">
                        <MarkdownRenderer content={promoCode?.discount.description} />
                    </article>
                    {promoCode?.promocode && (
                        <>
                            <div className="border bg-[#f8f8f8] flex justify-between items-end gap-2 w-full mt-5 p-4 rounded-[20px] border-[rgba(0,0,0,0.20)]">
                                <div>
                                    <p className="text-sm text-[#888888]">Промокод</p>
                                    <p className="text-2xl font-bold text-[#032c28] mt-1">
                                        {promoCode.promocode}
                                    </p>
                                </div>
                                <button className="w-8 h-8 cursor-pointer" onClick={copyToClipboard}>
                                    <Image src="/icons/offer/copy.svg" alt="Копировать промокод" width={24} height={24}/>
                                </button>
                            </div>
                            {copied && <p className="text-green-600 text-sm mt-2">Промокод скопирован!</p>}
                        </>
                    )}
                </div>
                <div className="flex justify-start items-start flex-row mt-10">
                    <div className="pb-[29px] w-full">
                        <div className="flex flex-col gap-5 w-[356px]">
                            {promoCode?.student && (
                                <>
                                <div className="flex flex-col gap-[5px] w-[148px]">
                                    <p className="text-sm text-[#888888]">Пользователь</p>
                                    <p className="text-xl font-bold text-[#032c28]">{promoCode.student.lastName} {promoCode.student.firstName}</p>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <p className="text-sm text-[#888888]">Университет</p>
                                    <p className="text-xl font-bold text-[#032c28]">{promoCode?.student.university.name}</p>
                                </div>
                                </>

                            )}
                            {promoCode?.discount.partner.companyName && (
                                <div className="flex flex-col gap-[5px]">
                                    <p className="text-sm text-[#888888]">Партнер</p>
                                    <p className="text-xl font-bold text-[#032c28]">{promoCode.discount.partner.companyName}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <Image 
                        alt="" 
                        src="/icons/offer/lines2.svg" 
                        height={102} 
                        width={245} 
                        className="h-[102px] w-[245px] object-cover mt-[150px] ml-[-50px]" />
                </div>
            </div>
        </Dialog> 
    )
}