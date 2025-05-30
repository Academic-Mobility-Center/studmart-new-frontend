import { parse, isAfter, isBefore, isEqual } from "date-fns";

import  ChartDataItem  from "@/types/ChartDataItem";

export function filterChartDataByDate(
  data: ChartDataItem[],
  startDate: Date | null,
  endDate: Date | null
): ChartDataItem[] {
  if (!startDate || !endDate) return data;

  return data.filter(item => {
    const parsedDate = parse(item.date, "dd.MM.yy", new Date());

    return (
      (isAfter(parsedDate, startDate) || isEqual(parsedDate, startDate)) &&
      (isBefore(parsedDate, endDate) || isEqual(parsedDate, endDate))
    );
  });
}