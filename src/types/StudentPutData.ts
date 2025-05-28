export default interface StudentPutData {
    id: string;
    firstName: string;
    lastName: string;
    sex: boolean;
    birthDate: string;
    email: string;
    specialisation: string;
    status: number;
    universityId: number;
    regionId: number;
    balance: number,
    cityId: number;
    languageIds: number[],
    hasWork: boolean,
    courseId: number,
    paymentInformation: {
        inn: number;
        bik: string,
        accountNumber: string,
    }
}