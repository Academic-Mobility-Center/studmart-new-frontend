import { Option } from "./Option";

export interface EventStatItem {
    value: number;
    percentage: number;
    isUp: boolean;
}

export default interface StatisticFormData {
    dateRange: [Date | null, Date | null];
    region: Option | undefined;
    university: Option | undefined;
    demographyData: {
        age: string;
        male: number;
        female: number;
    }[];
    geographyData: {
        city: string;
        value: number;
    }[];
    devicesData: {
        name: string;
        value: number;
    }[]
    eventStats?: {
        visitors: EventStatItem;
        repeatVisits: EventStatItem;
        uniqueVisitors: EventStatItem;
        promocodes: EventStatItem;
        repeatPromocodes: EventStatItem;
        siteVisits: EventStatItem;
    };
}