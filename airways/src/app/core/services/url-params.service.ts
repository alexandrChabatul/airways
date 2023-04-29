import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { environment } from 'src/environments/environment';
import { AirportResponseInterface } from '../models/airport-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UrlParamsService {
  constructor(private location: Location, private route: ActivatedRoute, private router: Router) {}

  addParam(param: string, data: AirportResponseInterface | Date | PassengersInterface) {
    let paramString = '';
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
        paramString = this.getDateParamString(data as Date);
        break;
      }
      case 'arrival': {
        paramString = this.getDateParamString(data as Date);
        break;
      }
      case 'passengers': {
        paramString = this.getPassengersParamString(data as PassengersInterface);
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

  getAirportParamString(data: AirportResponseInterface) {
    return data.code;
  }

  getDateParamString(data: Date) {
    return (
      data.getMonth() +
      environment.paramDelimiter +
      data.getDate() +
      environment.paramDelimiter +
      data.getFullYear()
    );
  }

  getPassengersParamString(data: PassengersInterface) {
    return Object.values(data).join(environment.paramDelimiter);
  }
}
