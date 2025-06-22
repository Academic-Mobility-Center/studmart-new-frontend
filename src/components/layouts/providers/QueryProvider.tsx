'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function getQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 3,
				gcTime: 1000 * 60 * 5,
			},
		},
	});
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => getQueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
