import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { CustomTooltip } from "@/components/charts/CustomTooltip";
import ChartDataItem from "@/types/ChartDataItem";


export type EventConfig = {
  title: string;
  chartData: ChartDataItem[];
  renderChart: (data: ChartDataItem[]) => React.ReactNode;
};

export const eventConfigs: Record<string, EventConfig> = {
  visitors: {
      title: "Посетители",
      chartData: [
        { date: "05.10.24", new: 230, repeat: 457, unique: 850, views: 510 },
        { date: "06.10.24", new: 640, repeat: 336, unique: 720, views: 680 },
        { date: "07.10.24", new: 435, repeat: 603, unique: 480, views: 752 },
        { date: "08.10.24", new: 187, repeat: 541, unique: 210, views: 670 },
        { date: "09.10.24", new: 389, repeat: 598, unique: 190, views: 660 },
        { date: "10.10.24", new: 599, repeat: 755, unique: 160, views: 690 },
        { date: "11.10.24", new: 412, repeat: 790, unique: 145, views: 710 },
        { date: "12.10.24", new: 721, repeat: 802, unique: 530, views: 490 },
      ],
      renderChart: (data) => (
        <div className="border border-zinc-300 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="linear" 
              dataKey="new" 
              stroke="#8FE248" 
              name="Новые" 
              strokeDasharray="4 2"
              strokeWidth={1} 
            />
            <Line 
              type="linear" 
              dataKey="repeat" 
              stroke="#F5052E" 
              name="Повторные посещения" 
              strokeDasharray="4 2"
              strokeWidth={1} 
            />
            <Line 
              type="linear" 
              dataKey="unique" 
              stroke="#FEE200" 
              name="Уникальные посетители"
              strokeDasharray="4 2"
              strokeWidth={1} 
            />
            <Line 
              type="linear" 
              dataKey="views" 
              stroke="#FFB9FF" 
              name="Просмотры"
              strokeDasharray="4 2"
              strokeWidth={1}                
            />
            
          </LineChart>
        </ResponsiveContainer>
        </div>

      ),
  },
  promocodes: {
    title: "Промокоды",
    chartData: [
      { date: "07.10.24", new: 120, repeat: 320, unique: 200, views: 200 },
      { date: "08.10.24", new: 245, repeat: 320, unique: 200, views: 200 },
      { date: "09.10.24", new: 310, repeat: 390, unique: 200, views: 200 },
      { date: "10.10.24", new: 190, repeat: 450, unique: 200, views: 200},
      { date: "11.10.24", new: 289, repeat: 480, unique: 200, views: 200 },
      { date: "12.10.24", new: 150, repeat: 200, unique: 200, views: 200},
    ],
    renderChart: (data) => {
      const maxValue = Math.max(...data.map(item => Math.max(item.new, item.repeat)));
    
      return (
        <div className="border border-zinc-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-4 mb-5 text-sm text-[#032C28]">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-[#76E57F]" />
              Новые
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-[#FFD54F]" />
              Повторные
            </div>
          </div>
          {data.map((item) => {
            const isRepeatBigger = item.repeat >= item.new;
            const leftValue = isRepeatBigger ? item.new : item.repeat;
            const rightValue = isRepeatBigger ? item.repeat : item.new;

            const leftColor = isRepeatBigger ? '#76E57F' : '#FFD54F';
            const rightColor = isRepeatBigger ? '#FFD54F' : '#76E57F';

            const leftWidth = `${(leftValue / maxValue) * 100}%`;
            const rightWidth = `${(rightValue / maxValue) * 100}%`;

            return (
              <div key={item.date} className="flex items-center gap-4 border-b-[0.66px] pb-2 border-gray-300 last:border-b-0 last:pb-0 ">
                <div className="text-xs text-gray-500 w-16 shrink-0 text-[#032C28]">{item.date}</div>

                <div className="flex w-full h-6 rounded-l-none rounded-r-full overflow-hidden bg-gray-100 relative text-xs font-medium">
                  <div
                    className="h-full flex items-center pl-2 text-[#032C28] rounded-r-full"
                    style={{
                      backgroundColor: leftColor,
                      width: leftWidth,
                      zIndex: 2,
                    }}
                  >
                    {leftValue}
                  </div>

                  <div
                    className="h-full flex items-center pl-4 -ml-2 text-[#032C28] rounded-r-full"
                    style={{
                      backgroundColor: rightColor,
                      left: leftWidth,
                      width: `calc(${rightWidth} - ${leftWidth})`,
                      zIndex: 1,
                    }}
                  >
                    {rightValue}
                  </div>
                </div>
              </div>
            );
          })}          
        </div>
      );
    }
    
  },
};