import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { environment } from 'src/environments/environment';
import { AirportResponseInterface } from '../models/airport-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UrlParamsService {
  constructor(private router: Router) {}

  addParam(param: string, data: AirportResponseInterface | string | PassengersInterface) {
    let paramString: string | null = '';
    switch (param) {
      case 'origin': {
        paramString = this.getAirportParamString(data as AirportResponseInterface);
        break;
      }
      case 'destination': {
        paramString = this.getAirportParamString(data as AirportResponseInterface);
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
    }
    const urlTree = this.router.createUrlTree([], {
      queryParams: { [param]: paramString, youCanRemoveMultiple: null },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.router.navigateByUrl(urlTree);
  }

  getAirportParamString(data: AirportResponseInterface) {
    return data.code;
  }

  getDateParamString(data: string) {
    if (!data) return null;
    return moment(data).format('MM-DD-YYYY');
  }

  getPassengersParamString(data: PassengersInterface) {
    return Object.values(data).join(environment.paramDelimiter);
  }
}
