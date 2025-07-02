export default interface StudentPutData {
	id: string;
	firstName: string;
	lastName: string;
	sex: boolean;
	birthDate: string;
	email: string;
	specialisation: string;
	status: number | null;
	universityId: number;
	regionId: number | null;
	balance: number;
	cityId: number | null;
	languageIds: number[] | [];
	hasWork: boolean;
	courseId: number;
	paymentInformation: {
		inn: number;
		bik: string;
		accountNumber: string;
		patronymic: string;
	} | null;
}
