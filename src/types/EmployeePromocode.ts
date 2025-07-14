export default interface EmployeePromocode {
	id: string;
	name: string;
	description: string;
	size: number;
	promocodeValue: string;
	partner: {
		id: string;
		companyName: string;
		subtitle: string;
		maxDiscount: number;
		isFixed: boolean;
	};
	hasAllRegions: boolean;
	regions: [];
}
