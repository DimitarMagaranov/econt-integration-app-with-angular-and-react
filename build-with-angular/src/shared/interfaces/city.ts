import { ICountry } from "./country";

export interface ICity {
    id: number;
    postCode: string;
    name: string;
    nameEn: string;
    regionName: string;
    regionNameEn: string;
    phoneCode: string;
    location: null;
    expressCityDeliveries: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    country: ICountry
}