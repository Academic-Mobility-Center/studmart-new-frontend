import { Option } from "./Option";

export interface PartnerPersonalAccountFormData{
    personalEmail: string | undefined;
    password: string;
    companyName: string;
    site: string;
    phoneNumber: string;
    companyEmail: string;
    industry: Option | undefined;
    country: Option | undefined;
    regions: Option[] | undefined;
    inn: string;
    currentAccount: string;
    corAccount: string;
    bic: string;
    allRegions: boolean;
    specificRegions: boolean;
}