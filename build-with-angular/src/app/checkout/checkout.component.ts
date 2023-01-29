import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICity } from 'src/shared/interfaces/city';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { IOffice } from 'src/shared/interfaces/office';
import { ISelectedProduct } from 'src/shared/interfaces/selectedProduct';
import { IWorkingTime } from 'src/shared/interfaces/workingTime';
import { IRecipient } from 'src/shared/interfaces/recipient';
import {sender} from '../../assets/constants';
import { AppService } from '../app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  selectedProduct!: ISelectedProduct;
  cities!: ICity[];
  offices: IOffice[] = [];
  selectedCityId!: number;
  selectedOfficeId!: number;
  selectedOffice!: IOffice;
  officeWorkingTime!: IWorkingTime;
  recipient!: IRecipient;
  dropDownForm!: FormGroup;
  label!: any;
  deliveryPrice!: number;
  totalPrice!: number;
  shipmentNumber!: string;
  expectedDeliveryDate!: string;
  labelStatus!: string;
  courierRequestID!: string;

  constructor(private activatedRoute: ActivatedRoute, private appService: AppService) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.selectedProduct = params as ISelectedProduct;
    

    this.appService.getCities()
      .subscribe({
        next: (data) => {
          this.cities = data.cities;
        },
        error: (err) => {
          console.log(err);
        }
      })

      this.dropDownForm = new FormGroup({
        selectedCity: new FormControl(),
        selectedOffice: new FormControl()
      });
    
  }

  selectCity() {
    this.offices = [];
    this.dropDownForm.controls['selectedOffice'].reset;
    this.selectedCityId = this.dropDownForm.controls['selectedCity'].value;
    this.loadOffices(this.selectedCityId);
  }

  selectOffice() {
    this.selectedOfficeId = this.dropDownForm.controls['selectedOffice'].value;
    this.selectedOffice = this.offices.find(x => x.id == this.selectedOfficeId)!;
    this.loadOfficeWorkingTime();
  }

  loadOffices(cityId: number) {
    this.appService.getOffices(cityId)
      .subscribe({
        next: (data) => {
          this.offices = data.offices;
        },
        error: (err) => {
          console.log(err);
          
        }
      })
  }

  loadOfficeWorkingTime() {
    const officeNormalBusinessHoursFrom = new Date(this.selectedOffice.normalBusinessHoursFrom);
    const officeNormalBusinessHoursTo = new Date(this.selectedOffice.normalBusinessHoursTo);
    const officeHalfDayBusinessHoursFrom = new Date(this.selectedOffice.halfDayBusinessHoursFrom);
    const officeHalfDayBusinessHoursTo = new Date(this.selectedOffice.halfDayBusinessHoursTo);

    const normalBusinessHoursFrom = this.padTo2Digits(officeNormalBusinessHoursFrom.getHours());
    const normalBusinessMinutesFrom = this.padTo2Digits(officeNormalBusinessHoursFrom.getMinutes());
    const normalBusinessHoursTo = this.padTo2Digits(officeNormalBusinessHoursTo.getHours());
    const normalBusinessMinutesTo = this.padTo2Digits(officeNormalBusinessHoursTo.getMinutes());

    const halfDayBusinessHoursFrom = this.padTo2Digits(officeHalfDayBusinessHoursFrom.getHours());
    const halfDayBusinessMinutesFrom = this.padTo2Digits(officeHalfDayBusinessHoursFrom.getMinutes());
    const halfDayBusinessHoursTo = this.padTo2Digits(officeHalfDayBusinessHoursTo.getHours());
    const halfDayBusinessMinutesTo = this.padTo2Digits(officeHalfDayBusinessHoursTo.getMinutes());

    this.officeWorkingTime = {
      mondayToFriday: `Monday - Friday: ${normalBusinessHoursFrom}:${normalBusinessMinutesFrom}-${normalBusinessHoursTo}:${normalBusinessMinutesTo}`,
      saturday: `Saturday: ${halfDayBusinessHoursFrom}:${halfDayBusinessMinutesFrom}-${halfDayBusinessHoursTo}:${halfDayBusinessMinutesTo}`
    } as IWorkingTime;
  }

  validateLabel(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const recipientData = {
      name: form.value['name'],
      phones: [form.value['phoneNumber']]
    }

    this.recipient = recipientData;
    this.createLabelDocument();

    this.appService.createOrValidateLabel(this.label, 'validate')
    .subscribe({
      next: (data) => {
        this.deliveryPrice = Number(data.label.totalPrice);
        this.totalPrice = Number(this.selectedProduct.price) + this.deliveryPrice;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createLabel() {
    this.appService.createOrValidateLabel(this.label, 'create')
    .subscribe({
      next: (data) => {
        this.shipmentNumber = data.label.shipmentNumber;
        console.log(this.shipmentNumber);
        console.log(data);
        
        this.requestCourier();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  requestCourier() {
    this.appService.requestCourier(this.createRequesCourierDocument())
    .subscribe({
      next: (data) => {
        this.courierRequestID = data.courierRequestID;
        console.log(this.courierRequestID);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getShipmentStatus() {
    this.appService.getShipmentStatus(this.shipmentNumber)
    .subscribe({
      next: (data) => {
        const expectedDeliveryDate = new Date(data.shipmentStatuses[0].status.expectedDeliveryDate);
        this.expectedDeliveryDate = `${expectedDeliveryDate.getDate()}/${expectedDeliveryDate.getMonth() + 1}/${expectedDeliveryDate.getFullYear()}`;
        this.labelStatus = data.shipmentStatuses[0].status.trackingEvents[0].destinationDetailsEn;
        console.log(data);
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createRequesCourierDocument(): any {
    let date = new Date();
    
    if (date.getHours() > 14) {
      date.setDate(new Date().getDate() + 1);
      date.setHours(9, 15);
    }

    return {
      requestTimeFrom: this.formatDate(date),
      requestTimeTo: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 14:45:00`,
      shipmentType: "PACK",
      shipmentPackCount: 1,
      shipmentWeight: this.selectedProduct.weight,
      senderClient: {
        name: sender.name,
        phones: sender.phones
      },
      senderAddress: sender.address
    };
  }

  createLabelDocument() {
    let date = new Date();
    
    if (date.getHours() > 14) {
      date.setDate(new Date().getDate() + 1);
    }

    this.label = {
      senderClient: {
        name: sender.name,
        phones: sender.phones
      },
      senderAddress: sender.address,
      receiverClient: this.recipient,
      receiverAddress:{
        city:{
          country:{
            code3: this.selectedOffice.address.city.country.code3
          },
          name: this.selectedOffice.address.city.name,
          postCode: this.selectedOffice.address.city.postCode
        },
        street: this.selectedOffice.address.street,
        num: this.selectedOffice.address.num,
        other: ''
      },
      packCount: 1,
      shipmentType: "PACK",
      weight: this.selectedProduct.weight,
      shipmentDescription: "парфюм",
      holidayDeliveryDay: "halfday",
      paymentReceiverMethod: "cash",
      paymentReceiverAmount: this.selectedProduct.price,
      sendDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    };
  };

  padTo2Digits(num: Number): string {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date: Date): string {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
}
