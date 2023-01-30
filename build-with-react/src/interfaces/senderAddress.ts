import { ICity } from "./city";

export interface ISenderAddress {
    city: ICity;
    street: string;
    num: string;
}