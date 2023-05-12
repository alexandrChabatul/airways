import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { environment } from 'src/environments/environment';
import { AirportResponseInterface } from '../models/airport-response.interface';
import { OrderInterface } from '../models/order.models';

@Injectable({
  providedIn: 'root',
})
export class UrlParamsService {
  constructor(private router: Router) {}

  addParam(
    param: string,
    data: AirportResponseInterface | string | PassengersInterface | null | boolean,
  ) {
    let paramString: string | null = '';
    switch (param) {
      case 'origin': {
        paramString = this.getAirportParamString(data as AirportResponseInterface | null);
        break;
      }
      case 'destination': {
        paramString = this.getAirportParamString(data as AirportResponseInterface | null);
        break;
      }
      case 'departure': {
        paramString = this.getDateParamString(String(data));
        break;
      }
      case 'arrival': {
        paramString = this.getDateParamString(String(data));
        break;
      }
      case 'passengers': {
        paramString = this.getPassengersParamString(data as PassengersInterface);
        break;
      }
      case 'isRound': {
        paramString = String(data);
        break;
      }
    }
    const urlTree = this.router.createUrlTree([], {
      queryParams: { [param]: paramString },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.router.navigateByUrl(urlTree);
  }

  getIsRoundType(type: string | undefined): boolean {
    return type ? type !== 'false' : true;
  }

  getAirportParamString(data: AirportResponseInterface | null) {
    return data?.code ? data.code : null;
  }

  getDateParamString(data: string | null) {
    if (!data) return null;
    return moment(data).format('MM-DD-YYYY');
  }

  getPassengersParamString(data: PassengersInterface) {
    return Object.values(data).join(environment.paramDelimiter);
  }

  getQueryParamObj(order: OrderInterface) {
    return {
      origin: this.getAirportParamString(order.origin),
      destination: this.getAirportParamString(order.destination),
      departure: this.getDateParamString(order.departure),
      arrival: this.getDateParamString(order.arrival),
      passengers: this.getPassengersParamString(order.passengers),
      isRound: order.isRound,
    };
  }

  swapAirports(origin: AirportResponseInterface, destination: AirportResponseInterface) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        origin: this.getAirportParamString(destination),
        destination: this.getAirportParamString(origin),
      },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
    this.router.navigateByUrl(urlTree);
  }
}
