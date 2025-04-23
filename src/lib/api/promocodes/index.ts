import { httpClient } from "../httpClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_PROMOCODES_SERVICE

export const getPromocodeCategory = httpClient.get("/Categories", API_BASE_URL);
export const getPromocodeCategoryById = (id: string) => httpClient.get(`/Categories/${id}`, API_BASE_URL);

export const getPromocodeDiscounts = httpClient.get("/Discounts", API_BASE_URL);
export const updatePromocodeDiscount = (data: any) =>  httpClient.post("/Discounts", data, API_BASE_URL);
export const getPromocodeDiscountById = (id: string) => httpClient.get(`/Discounts/${id}`, API_BASE_URL);

export const getPromocodePartners = httpClient.get("/Partners", API_BASE_URL);
export const getPromocodePartnerById = (id: string) => httpClient.get(`/Partners${id}`, API_BASE_URL);

export const getPromocode = httpClient.get("Promocodes", API_BASE_URL);
export const updatePromocode = (data: any) => httpClient.post("/Promocodes", data, API_BASE_URL);
export const getPromocodeById = (id: string) => httpClient.get(`Promocodes/${id}`, API_BASE_URL);

export const getPromocodeRegions = httpClient.get("/Regions", API_BASE_URL);
export const getPromocodeRegionById = (id: string) => httpClient.get(`/Regions/${id}`, API_BASE_URL);