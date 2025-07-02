type Params = {
	From?: string;
	To?: string;
	RegionId?: string;
	UniversityId?: string;
	PartnerId?: string;
	IsCities?: string;
	IsSex?: string;
	IsDevices?: string;
};

export const getEvents = async ({ From, To, RegionId, UniversityId, PartnerId }: Params) => {
	try {
		const query = new URLSearchParams();

		if (From) query.append('From', From);
		if (To) query.append('To', To);
		if (RegionId) query.append('RegionId', RegionId);
		if (UniversityId) query.append('UniversityId', UniversityId);
		if (PartnerId) query.append('PartnerId', PartnerId);

		const res = await fetch(`/api/statistics/Events?${query.toString()}`);

		if (!res.ok) {
			console.warn(`getEvents: статистика не найдена (${res.status})`);
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getEvents:', error);
		return null;
	}
};

export const getUsersCities = async ({ IsCities, From, To, PartnerId }: Params) => {
	try {
		const query = new URLSearchParams();
		if (IsCities) query.append('IsCities', IsCities);
		if (From) query.append('From', From);
		if (To) query.append('To', To);
		if (PartnerId) query.append('PartnerId', PartnerId);

		const res = await fetch(`/api/statistics/Users?${query.toString()}`);

		if (!res.ok) {
			console.warn(`getUsersCities: статистика не найдена (${res.status})`);
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getUsersCities:', error);
		return null;
	}
};
export const getUsersDemography = async ({ IsSex, From, To, PartnerId }: Params) => {
	try {
		const query = new URLSearchParams();
		if (IsSex) query.append('IsSex', IsSex);
		if (From) query.append('From', From);
		if (To) query.append('To', To);
		if (PartnerId) query.append('PartnerId', PartnerId);
		const res = await fetch(`/api/statistics/Users?${query.toString()}`);

		if (!res.ok) {
			console.warn(`getUsersDemography: статистика не найдена (${res.status})`);
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getUsersDemography:', error);
		return null;
	}
};
export const getUsersDevices = async ({ IsDevices, From, To, PartnerId }: Params) => {
	try {
		const query = new URLSearchParams();
		if (IsDevices) query.append('IsDevices', IsDevices);
		if (From) query.append('From', From);
		if (To) query.append('To', To);
		if (PartnerId) query.append('PartnerId', PartnerId);

		const res = await fetch(`/api/statistics/Users?${query.toString()}`);

		if (!res.ok) {
			console.warn(`getUsersDevices: статистика не найдена (${res.status})`);
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getUsersDevices:', error);
		return null;
	}
};

export const forwardLinks = async (partnerId: string, studentId: string) => {
	try {
		const response = await fetch(`/api/statistics/forward`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
			},
			body: JSON.stringify({
				partnerId,
				studentId,
			}),
		});
		if (!response.ok) {
			console.log(`Ошибка при отправлении файла: ${response.status}`);
		}
		const text = await response.text();
		const data = text ? JSON.parse(text) : { status: response.status };

		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getDetailedPromocodes = async ({
	From,
	To,
	RegionId,
	UniversityId,
	PartnerId,
}: Params) => {
	try {
		const query = new URLSearchParams();
		if (From) query.append('From', From);
		if (To) query.append('To', To);
		if (RegionId) query.append('RegionId', RegionId);
		if (UniversityId) query.append('UniversityId', UniversityId);
		if (PartnerId) query.append('PartnerId', PartnerId);
		const res = await fetch(`/api/statistics/Detailed/promocodes?${query.toString()}`);

		if (!res.ok) {
			console.warn(`getDetailedPromocodes: статистика не найдена (${res.status})`);
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getDetailedPromocodes:', error);
		return null;
	}
};
export const getDetailedVisitors = async ({
	From,
	To,
	RegionId,
	UniversityId,
	PartnerId,
}: Params) => {
	try {
		const query = new URLSearchParams();
		if (From) query.append('From', From);
		if (To) query.append('To', To);
		if (RegionId) query.append('RegionId', RegionId);
		if (UniversityId) query.append('UniversityId', UniversityId);
		if (PartnerId) query.append('PartnerId', PartnerId);
		const res = await fetch(`/api/statistics/Detailed/visitors?${query.toString()}`);

		if (!res.ok) {
			console.warn(`getDetailedVisitors: статистика не найдена (${res.status})`);
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getDetailedPromocodes:', error);
		return null;
	}
};
