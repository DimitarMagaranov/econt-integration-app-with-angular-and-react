import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getCities() {
    return this.httpClient.post<any>('http://demo.econt.com/ee/services/Nomenclatures/NomenclaturesService.getCities.json', {"countryCode":"BGR"});
  }

  getOffices(cityId: number) {
    return this.httpClient.post<any>('http://demo.econt.com/ee/services/Nomenclatures/NomenclaturesService.getOffices.json', {"countryCode":"BGR", "cityID":cityId});
  }

  createOrValidateLabel(label: any, mode: string) {
    return this.httpClient.post<any>('http://demo.econt.com/ee/services/Shipments/LabelService.createLabel.json', {label: label, mode: mode});
  }

  getShipmentStatus(shipmentNumber: string) {
    return this.httpClient.post<any>('http://demo.econt.com/ee/services/Shipments/ShipmentService.getShipmentStatuses.json', {"shipmentNumbers":[shipmentNumber]});
  }

  requestCourier(data: any) {
    return this.httpClient.post<any>('http://ee.econt.com/services/Shipments/ShipmentService.requestCourier.json', data);
  }
}
