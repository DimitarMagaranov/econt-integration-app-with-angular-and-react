import { ICity } from "./city";
import { ILocation } from "./location";

export interface IOfficeAddress {
    id: number | null;
    city: ICity;
    fullAddress: string;
    fullAddressEn: string;
    quarter: string;
    street: string | null;
    num: string | number | null | undefined;
    other: string;
    location: ILocation;
    zip: string | null;
}