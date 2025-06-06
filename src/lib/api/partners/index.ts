import { EmployeePutData, PartnerPutData } from '@/types/PartnerUpdateData';

export const getPartner = async (id: string) => {
	try {
		const res = await fetch(`/api/partners/Partners?id=${id}`);

		if (!res.ok) {
			throw new Error(`Ошибка при получении партнеров: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPartner:', error);
		return null;
	}
};
export const getPartnerCategories = async () => {
	try {
		const res = await fetch('/api/partners/Categories');

		if (!res.ok) {
			throw new Error(`Ошибка при получении категорий партнеров: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPartnerCategories:', error);
		return null;
	}
};
export const getPartnerCountries = async () => {
	try {
		const res = await fetch('/api/partners/Countries');

		if (!res.ok) {
			throw new Error(`Ошибка при получении стран: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPartnerCountries:', error);
		return null;
	}
};
export const getPartnerRegions = async () => {
	try {
		const res = await fetch('/api/partners/Regions');

		if (!res.ok) {
			throw new Error(`Ошибка при получении регионов партнеров: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPartnerRegions:', error);
		return null;
	}
};
export const getPartnerInfo = async (id: string) => {
	try {
		const res = await fetch(`/api/partners/Employees?id=${id}`);

		if (!res.ok) {
			throw new Error(`Ошибка при получении партнера: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPartnerInfo:', error);
		return null;
	}
};
export const getPartnerRegionById = async (id: string) => {
	try {
		const res = await fetch(`/api/partners/Regions?id=${id}`);

		if (!res.ok) {
			throw new Error(`Ошибка при получении региона по id: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPartnerRegionById:', error);
		return null;
	}
};
export const sendPartnerDescription = async (description: string, employeeId: string) => {
	try {
		const res = await fetch(`/api/partners/DescriptionRequests`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ description, employeeId }),
		});

		if (!res.ok) {
			throw new Error(`Ошибка при получении региона по id: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка при регистрации студента:', error);
		return 500; // или другой код по умолчанию, например, 0
	}
};
export const sendDescriptionFile = async (id: string, image: string, contentType: string) => {
	try {
		const res = await fetch(`/api/files/Requests`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', accept: '*/*' },
			body: JSON.stringify({ id, image, contentType }),
		});

		return res.status;
	} catch (error) {
		console.error('Ошибка при регистрации студента:', error);
		return 500;
	}
};

export const updateEmployee = async (
	id: string,
	employee: EmployeePutData,
): Promise<{ status: number; error?: string }> => {
	try {
		const response = await fetch(`/api/partners/Employees?id=${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
			},
			body: JSON.stringify(employee),
		});

		if (!response.ok) {
			const errorMessage = `Ошибка при обновлении данных студента: ${response.status}`;
			console.warn(errorMessage);
			return { status: response.status, error: errorMessage };
		}

		return { status: response.status };
	} catch (error) {
		const errorMessage = `Ошибка запроса: ${error}`;
		console.error(errorMessage);
		return { status: 500, error: errorMessage };
	}
};
export const updatePartner = async (
	id: string,
	partner: PartnerPutData,
): Promise<{ status: number; error?: string }> => {
	try {
		const response = await fetch(`/api/partners/Partners?id=${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
			},
			body: JSON.stringify(partner),
		});

		if (!response.ok) {
			const errorMessage = `Ошибка при обновлении данных студента: ${response.status}`;
			console.warn(errorMessage);
			return { status: response.status, error: errorMessage };
		}

		return { status: response.status };
	} catch (error) {
		const errorMessage = `Ошибка запроса: ${error}`;
		console.error(errorMessage);
		return { status: 500, error: errorMessage };
	}
};
