import React from "react";
import ArrowForward from "../../../public/icons/partner-account/arrow-forward";
import ArrowDown from "../../../public/icons/partner-account/arrow-down";
import Link from "next/link";

interface StatCardProps {
  width?: number | string;
  height?: number | string;
  title: string;
  percentage: string;
  value: string | number;
  onDetailsClick?: () => void;
  isUp: boolean;
  eventKey: string;

}

export const StatCard: React.FC<StatCardProps> = ({
  width = 262,
  height,
  title,
  percentage,
  value,
  onDetailsClick,
  isUp,
  eventKey,
}) => {
    console.log(eventKey)
  return (
        <div style={{ display: "inline-block", width }}>
        <div
            className="border bg-[#f8f8f8] box-border flex flex-col justify-between 
            items-stretch pl-[19px] pr-5 py-5 rounded-[15px] 
            border-solid border-[rgba(0,0,0,0.20)]"
            style={{ width, height, maxHeight: height }}
        >
            <div className="flex items-start justify-between gap-2" style={{minHeight: '40px'}}>
                <p className="font-bold text-sm text-[#032c28] leading-snug break-words max-w-[150px]">
                    {title}
                </p>
                <div className="flex items-center gap-[5px] shrink-0">
                    <div className="w-6 h-6 flex">
                    {isUp ? <ArrowForward /> : <ArrowDown />}
                    </div>
                    <p
                    className="text-xl font-bold"
                    style={{ color: isUp ? "#8fe248" : "#F5052E" }}
                    >
                    {percentage}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-stretch mt-6">
            <p className="text-4xl font-extrabold tracking-[1.08px] leading-9 text-[#032c28] text-center">
                {value}
            </p>
            <Link href={""}
            // href={`/partner-personal-account/event-details/${eventKey}`}
            >
                <button
                    className="bg-[#8fe248] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] 
                    cursor-pointer min-w-[222px] h-12 mt-5 rounded-[15px] border-none"
                    onClick={onDetailsClick}
                    disabled
                >
                    Подробнее
                </button>
            </Link>

            </div>
        </div>
        </div>
  );
};
