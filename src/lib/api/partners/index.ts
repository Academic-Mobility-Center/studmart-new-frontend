import { httpClient } from "../httpClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_PARTNERS_SERVICE

export const getPartnerCategories = () => httpClient.get("/Categories", API_BASE_URL);
export const updatePartnerCategory = (data: any) => httpClient.post("/Categories", data, API_BASE_URL);

export const getPartnerCountries = httpClient.get("/Countries", API_BASE_URL);
export const updatePartnerCounty = (data: any) => httpClient.post("/Countries", data, API_BASE_URL)

export const getPartnerEmployees = httpClient.get("/Employees", API_BASE_URL);
export const updatePartnerEmployee = (data: any) => httpClient.post("/Employees", data, API_BASE_URL);

export const getPartner = httpClient.get("/Partners", API_BASE_URL);
export const updatePartner = (data: any) => httpClient.post("/Partners", data, API_BASE_URL)

export const getPartnerRegions = httpClient.get("/Regions", API_BASE_URL);
export const updatePartnerRegions = (data: any) => httpClient.post("/Regions", data, API_BASE_URL)
