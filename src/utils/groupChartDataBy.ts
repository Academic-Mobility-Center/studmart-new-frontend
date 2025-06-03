import { parse, format } from "date-fns";
import { ru } from "date-fns/locale";

type ChartDataItem = {
  date: string;
  new: number;
  repeat: number;
  unique: number;
  views: number;
};

export function groupChartDataBy(data: ChartDataItem[], groupBy: "day" | "week" | "month") {
  const grouped = new Map<string, ChartDataItem>();

  data.forEach(item => {
    const parsedDate = parse(item.date, "yyyy-MM-dd", new Date());
    let key = "";

    if (groupBy === "day") {
      key = format(parsedDate, "dd.MM.yy");
    } else if (groupBy === "week") {
      key = `Неделя ${format(parsedDate, "w")} (${format(parsedDate, "MMM", { locale: ru })})`;
    } else {
      key = format(parsedDate, "MMMM yyyy", { locale: ru });
    }

    if (!grouped.has(key)) {
      grouped.set(key, { date: key, new: 0, repeat: 0, unique: 0, views: 0 });
    }

    const existing = grouped.get(key)!;
    grouped.set(key, {
      ...existing,
      new: existing.new + item.new,
      repeat: existing.repeat + item.repeat,
      unique: existing.unique + (item.unique ?? 0),
      views: existing.views + (item.views ?? 0),
    });
  });

  return Array.from(grouped.values());
}
