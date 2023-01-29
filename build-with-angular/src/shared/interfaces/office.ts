import { IOfficeAddress } from "./officeAddress";

export interface IOffice {
    id: number;
    code: string;
    isMPS: boolean;
    isAPS: boolean;
    name: string;
    nameEn: string;
    phones: string[];
    emails: string[];
    address: IOfficeAddress;
    info: string;
    currency: string;
    language: string | null;
    normalBusinessHoursFrom: number;
    normalBusinessHoursTo: number;
    halfDayBusinessHoursFrom: number;
    halfDayBusinessHoursTo: number;
    sundayBusinessHoursFrom: number | null;
    sundayBusinessHoursTo: number | null;
    shipmentTypes: string[];
    partnerCode: string;
    hubCode: string;
    hubName: string;
    hubNameEn: string;
}