import { Option } from "./Option";

export interface PartnerPersonalAccountFormData{
    personalEmail: string;
    password: string;
    companyName: string;
    site: string;
    phoneNumber: string;
    companyEmail: string;
    industry: Option;
    country: Option;
    regions: Option[];
    inn: string;
    currentAccount: string;
    corAccount: string;
    bic: string;
    allRegions: boolean;
    specificRegions: boolean;
}