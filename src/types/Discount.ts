export default interface Discount {
	id: string;
	name: string;
	description: string;
	size: number;
	promocodeValue: string;
	partner: DiscountPartner;
	hasAllRegions: boolean;
	regions: { id: number; name: string }[];
}
interface DiscountPartner {
	id: string;
	companyName: string;
	subtitle: string;
	description: string;
	site: string;
	category: { id: number; name: string };
	hasAllRegions: boolean;
	regions: { id: number; name: string }[];
}
