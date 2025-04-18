import Link from "next/link";
import { usePathname } from "next/navigation";

const StatisticTabs = () => {
    const pathname = usePathname();

    return (
        <div className="flex justify-start items-center flex-row">
            <Link href="/statistics/users">
                <button
                    className={`h-12 w-[262px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer ${
                        pathname === "/statistics/users"
                            ? "bg-[#8fe248] text-[#032c28]"
                            : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"
                    }`}
                >
                    Пользователи
                </button>
            </Link>
            <Link href="/statistics/events">
                <button
                    className={`ml-6 h-12 w-[262px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer ${
                        pathname === "/statistics/events"
                            ? "bg-[#8fe248] text-[#032c28]"
                            : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"
                    }`}
                >
                    События
                </button>
            </Link>
        </div>
    );
};

export default StatisticTabs;
