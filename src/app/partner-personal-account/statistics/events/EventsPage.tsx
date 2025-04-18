"use client";

import { useStatisticForm } from "@/context/StatisticFormContext";
import StatisticEvents from "@/components/forms/statistics-form/StatisticEvents";
import StatisticTabs from "@/components/statistic-tabs/StatisticTabs";

const universityOptions = [
    { id: 1, name: "Россия" },
    { id: 2, name: "США" },
    { id: 3, name: "ОАЭ" },
];

const regionOptions = [
    { id: 1, name: "НСК" },
    { id: 2, name: "СПБ" },
    { id: 3, name: "МСК" },
    { id: 4, name: "ЕКБ" },
];

export default function EventsPage() {
    const { formData, setFormData } = useStatisticForm();

    return (
        <>
            <StatisticTabs />
            <StatisticEvents
                regionOptions={regionOptions}
                universityOptions={universityOptions}
                formData={formData}
                setFormData={setFormData}
            />
        </>
    );
}