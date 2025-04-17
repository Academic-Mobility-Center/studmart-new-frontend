"use client";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#8fe248", "#FFD55A"];

type Props = {
  data: { name: string; value: number }[];
};

export const DevicesChart = ({ data }: Props) => (
  <div className="mt-8">
    <p className="font-bold text-[#032c28] mb-2">Устройства</p>
    <div className="w-full flex justify-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={70}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  </div>
);