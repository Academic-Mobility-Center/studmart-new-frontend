"use client";

type Props = {
  data: { city: string; value: number }[];
};

export const GeographyChart = ({ data }: Props) => (
  <div className="mt-8">
    <p className="font-bold text-[#032c28] mb-2">География</p>
    {data.map((item, i) => (
      <div key={i} className="mb-2">
        <div className="flex justify-between text-sm text-[#032c28]">
          <span>{item.city}</span>
          <span>{item.value.toFixed(2)}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-2 rounded-full bg-[#8fe248]"
            style={{ width: `${item.value}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
);