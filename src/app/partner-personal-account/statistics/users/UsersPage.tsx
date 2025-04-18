import StatisticUsers from "@/components/forms/statistics-form/StatisticUsers";
import { useStatisticForm } from "@/context/StatisticFormContext";
import StatisticTabs from "@/components/statistic-tabs/StatisticTabs";

export default function UsersPage() {
    const { formData, setFormData } = useStatisticForm();

    return (
        <>
            <StatisticTabs />
            <StatisticUsers formData={formData} setFormData={setFormData} />
        </>
    );
}