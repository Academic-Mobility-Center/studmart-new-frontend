"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Props = {
  data: { age: string; male: number; female: number }[];
};

export const DemographyChart = ({ data }: Props) => {
  const totalMale = data.reduce((sum, item) => sum + item.male,0);
  const totalFemale = data.reduce((sum, item) => sum + item.female,0);
  const total = totalFemale + totalMale;

  const malePercent = total ? ((totalMale/total) * 100 ).toFixed(0) : "0";
  const femalePercent = total ? ((totalFemale/total) * 100 ).toFixed(0) : "0"
  return (
    <div className="mt-10">
      <div className="flex justify-between items-start mb-2">
        <p className="font-bold text-[#032c28]">Демография</p>
        <div className="flex flex-col gap-1 text-sm text-[#032c28]">
          <div className="flex items-center gap-1 text-sm text-[#032c28]">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3A7AFE" }} />
            Муж. - {malePercent}%
          </div>
          <div className="flex items-center gap-1 text-sm text-[#032c28]">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FB5E9C" }} />
            Жен. - {femalePercent}%
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="male" fill="#3A7AFE" name="Муж." />
          <Bar dataKey="female" fill="#FB5E9C" name="Жен." />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
