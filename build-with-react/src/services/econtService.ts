import { user } from "../constants"
import { ILabel } from "../interfaces/label"

export const getCities = () => {
    return fetch('http://demo.econt.com/ee/services/Nomenclatures/NomenclaturesService.getCities.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"countryCode":"BGR"})
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getOffices = (cityId: Number) => {
    return fetch('http://demo.econt.com/ee/services/Nomenclatures/NomenclaturesService.getOffices.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"countryCode":"BGR", "cityID":cityId})
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const createOrValidateLabel = (label: ILabel, mode: string) => {
    return fetch('http://demo.econt.com/ee/services/Shipments/LabelService.createLabel.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({label: label, mode: mode})
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getShipmentStatus = (shipmentNumber: Number) => {
    return fetch('http://demo.econt.com/ee/services/Shipments/ShipmentService.getShipmentStatuses.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${user}`
        },
        body: JSON.stringify({"shipmentNumbers":[shipmentNumber]})
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}