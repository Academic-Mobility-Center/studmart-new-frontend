"use client";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#8fe248", "#FFD55A"];

type Props = {
  data: { name: string; value: number }[];
};

export const DevicesChart = ({ data }: Props) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mt-4">
      <p className="font-bold text-[#032c28] mb-2 pl-5">Устройства</p>
      <div className="flex items-start gap-8 mb-4 pl-3">
        <PieChart width={158} height={158}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={70}
            innerRadius={40}
            dataKey="value"
            label={false}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>

        <div className="flex flex-col justify-center gap-2 pl-5">
          <div className="flex font-medium text-[#888888]">
            <span style={{ width: 206 }}>Устройства</span>
            <span style={{ width: 79, marginLeft: '10px' }}>Количество</span>
          </div>
          {data.map((item, index) => (
            <div key={index} className="flex text-sm items-center text-[#032c28]">
              <div className="flex items-center" style={{ width: 206 }}>
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                {item.name}
              </div>
              <span style={{ width: 79, textAlign: "right", marginLeft: '15px' }}>
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
