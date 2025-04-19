import Country from "./Country";

export default interface Region {
    id: number;
    name: string;
    country: Country;
}