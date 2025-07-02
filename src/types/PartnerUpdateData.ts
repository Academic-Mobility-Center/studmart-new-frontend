export interface EmployeePutData {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	partnerId: string;
}

export interface PartnerPutData {
	id: string;
	name: string;
	subtitle: string;
	description: string;
	priority: number;
	email: string;
	phone: string;
	inn: number;
	countryId: number;
	site: string;
	categoryId: number;
	paymentInformation: {
		bik: string;
		accountNumber: string;
		correspondentAccountNumber: string;
	};
	hasAllRegions: boolean;
	regionIds: number[];
}
