"use client";

type Props = {
  data: { city: string; value: number }[];
};

export const GeographyChart = ({ data }: Props) => (
  <div className="mt-4 pb-2">
    <p className="font-bold text-[#032c28] mb-4">География</p>
    <div className="flex items-center gab-4 mb-3 text-sm text-[#888888]">
      <div className="w-40">Города</div>
      <span className="text-sm pl-3">
          % от общего числа
        </span>
      <div className="w-12" />
    </div>
    {data.map((item, i) => (
      <div
        key={i}
        className="flex items-center gap-4 mb-3 text-sm 
        text-[#032c28] border-b-[0.66px] 
        border-gray-300 pb-[10px] last:border-b-0 last:pb-0"
      >
        <div className="w-40">{item.city}</div>
        <div 
          className="flex-1 bg-gray-200 h-6 rounded-r-full
          overflow-hidden relative"
        >
          <div
            className="h-6 bg-[#8fe248] rounded-r-full"
            style={{ width: `${item.value}%` ,}}
          />
        </div>
        <div className="w-20 text-right">{item.value.toFixed(0)}%</div>
      </div>
    ))}
  </div>
);
