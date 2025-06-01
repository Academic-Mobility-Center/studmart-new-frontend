`use client`;
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import {ru} from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

registerLocale("ru", ru);

type Props = {
  label: string;
  width: number;
  labelFontSize: number;
  value?: [Date | null, Date | null];
  onChange?: (dates: [Date | null, Date | null]) => void;
};

export function DateRangeField({
  label,
  width,
  labelFontSize,
  value,
  onChange,
}: Props) {
  const [startDate, endDate] = value || [null, null];
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleIconClick = () => {
    setOpen(true);
    inputRef?.current?.focus();
  }

  const handleClear = () => {
    onChange?.([null, null]);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2" style={{ width: `${width}px` }}>
      <label
        style={{ fontSize: `${labelFontSize}px` }}
        className="text-[#032c28]"
      >
        {label}
      </label>
      <div className="relative">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(dates) => {
            onChange?.(dates as [Date | null, Date | null]);
            if ((dates as [Date | null, Date | null])[1]) {
              setOpen(false);
            }
          }}
          locale="ru"
          dateFormat="dd.MM.yyyy"
          placeholderText="01.01.2024 - 01.01.2025"
          className="pl-6 border border-gray-300 rounded-2xl focus:outline-none text-[#032c28] h-[48px] mr-20 w-full"
          calendarClassName="z-50"
          popperPlacement="bottom-start"
          open={open}
          onClickOutside={() => setOpen(false)}
        />
        {startDate && endDate ? (
          <button
            onClick={handleClear} 
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-[12px] text-gray-400 hover:text-black"
            aria-label="Очистить"
          >
            ✕
          </button>
          ) : (
          <button
            type="button"
            onClick={handleIconClick}
            className="absolute top-1/2 -translate-y-1/2 right-[12px]"
            aria-label="Открыть календарь"
          >
            <Image src="/icons/partner-account/calendar.svg" alt="" width={24} height={24}/>
          </button>
        )}
      </div>
    </div>
  );
}