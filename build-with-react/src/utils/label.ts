import { sender } from "../constants";
import { IOffice } from "../interfaces/office";
import { IProduct } from "../interfaces/product";

import {IRecipient} from '../interfaces/recipient'

export const createLabelDocument = (
        recipient: IRecipient,
        selectedOffice: IOffice,
        selectedProduct:  IProduct
    ) => {
    let date = new Date();

    if (date.getHours() > 14) {
        date.setDate(new Date().getDate() + 1);
    }

    return {
        senderClient: {
            name: sender.name,
            phones: sender.phones,
        },
        senderAddress: sender.address,
        receiverClient: recipient,
        receiverAddress: {
            city: {
                country: {
                    code3: selectedOffice.address.city.country.code3,
                },
                name: selectedOffice.address.city.name,
                postCode: selectedOffice.address.city.postCode,
            },
            street: selectedOffice.address.street,
            num: selectedOffice.address.num,
            other: '',
        },
        packCount: 1,
        shipmentType: 'PACK',
        weight: selectedProduct.selectedCut!.weight,
        shipmentDescription: 'парфюм',
        holidayDeliveryDay: 'halfday',
        paymentReceiverMethod: 'cash',
        paymentReceiverAmount: selectedProduct.price,
        sendDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    };
};
