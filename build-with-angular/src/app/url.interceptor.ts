import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import {  Observable } from "rxjs";

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    user = {
        username: 'iasp-dev',
        password: '1Asp-dev'
    };

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('http://demo.econt.com/ee/services/Shipments/ShipmentService.getShipmentStatuses.json')) {
      req = req.clone({
            setHeaders: { 
                Authorization: `Basic ${this.user}`
            }
        });
    }
    return next.handle(req);
  }

}

export const urlInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlInterceptor,
  multi: true
};