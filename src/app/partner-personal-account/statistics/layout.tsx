'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { StatisticProvider } from './context';

export default function StatisticsLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const activeTab = pathname.includes('events') ? 'events' : 'users';

	return (
		<div
			className="border bg-[#f8f8f8] 
      box-border px-[19px] py-5 rounded-[15px] 
      border-solid border-[rgba(0,0,0,0.20)] 
      max-w-[590px]"
		>
			<p className="font-nunito text-2xl font-extrabold text-[#032c28] m-0 p-0">Статистика</p>

			<div className="mt-5">
				{/* Табы */}
				<div className="flex justify-start items-center flex-row mb-6">
					<Link href="/partner-personal-account/statistics/users">
						<button
							className={`h-12 w-[262px] rounded-[15px] text-sm font-bold 
              uppercase tracking-[0.42px] cursor-pointer ${
								activeTab === 'users'
									? 'bg-[#8fe248] text-[#032c28]'
									: 'bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]'
							}`}
						>
							Пользователи
						</button>
					</Link>
					<Link href="/partner-personal-account/statistics/events">
						<button
							className={`ml-6 h-12 w-[262px] rounded-[15px] text-sm font-bold 
              uppercase tracking-[0.42px] cursor-pointer ${
								activeTab === 'events'
									? 'bg-[#8fe248] text-[#032c28]'
									: 'bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]'
							}`}
						>
							События
						</button>
					</Link>
				</div>
				<StatisticProvider>{children}</StatisticProvider>
			</div>
		</div>
	);
}
