import { Observable } from 'rxjs';
import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { AutocompleteResponseInterface } from './autocomplete-response.interface';

export interface UrlParamsInterface {
  from: Observable<AutocompleteResponseInterface | null>;
  destination: Observable<AutocompleteResponseInterface | null>;
  start: Date | null;
  end: Date | null;
  passengers: PassengersInterface;
}
