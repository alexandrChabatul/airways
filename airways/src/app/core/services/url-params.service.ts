import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UrlParamsInterface } from '../models/url-params.models';
import { AutocompleteService } from './autocomplete.service';

@Injectable({
  providedIn: 'root',
})
export class UrlParamsService {
  constructor(private autoCompleteService: AutocompleteService) {}

  decodeParams(paramsString: string): UrlParamsInterface {
    //KKS%29032022%LLT%%123
    const params = paramsString.split(environment.paramDelimiter);
    const from = this.autoCompleteService.getAirportByCode(params[0]);
    const start = this.getDate(params[1]);
    const destination = this.autoCompleteService.getAirportByCode(params[2]);
    return {
      from,
      start,
      destination,
      end: new Date(),
      passengers: {
        adults: 0,
        child: 0,
        infant: 0,
      },
    };
  }

  getDate(date: string): Date | null {
    console.log(date);
    return null;
  }
}
