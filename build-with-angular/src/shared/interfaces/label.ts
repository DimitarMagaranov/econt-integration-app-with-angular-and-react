import { IOffice } from "./office";
import { IOfficeAddress } from "./officeAddress";
import { IRecipient } from "./recipient";
import { ISenderAddress } from "./senderAddress";
import { ISenderClient } from "./senderClient";

export interface ILabel {
    senderClient: ISenderClient;
    senderAddress: ISenderAddress;
    receiverClient: IRecipient;
    receiverAddress: IOffice;
    packCount: number;
    shipmentType: string;
    weight: number;
    shipmentDescription: string;
}