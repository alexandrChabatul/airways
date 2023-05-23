import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItemInterface } from 'src/app/core/models/cart.models';
import { addToCartAction } from 'src/app/core/store/actions/cart.actions';
import { selectCartItems } from 'src/app/core/store/selectors/cart.selectors';

@Component({
  selector: 'airways-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
})
export class ShoppingCartPageComponent implements OnInit {
  items$!: Observable<CartItemInterface[] | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.items$ = this.store.select(selectCartItems);
  }

  addToCart() {
    this.store.dispatch(
      addToCartAction({
        item: {
          flightNumber_to: 'P15324',
          flightNumber_from: 'P15325',
          origin: {
            id: 'a496e3f4-d4ed-46ec-9791-dea31669bb8d',
            type: 'airport',
            code: 'GYD',
            name: 'Heydar Aliyev International Airport',
            main_airport_name: 'Heydar Aliyev International Airport',
            country_code: 'AZ',
            country_name: 'Azerbaijan',
            city_name: 'Baku',
            state_code: null,
            coordinates: {
              lon: 50.05039,
              lat: 40.462486,
            },
            index_strings: [],
            weight: 112326,
            cases: null,
            country_cases: null,
          },
          destination: {
            id: '1240c312-d0b3-4c55-a9d0-e4fc6a529b9b',
            type: 'airport',
            code: 'VKO',
            name: 'Vnukovo Airport',
            main_airport_name: 'Vnukovo Airport',
            country_code: 'RU',
            country_name: 'Russia',
            city_name: 'Moscow',
            state_code: null,
            coordinates: {
              lon: 37.2921,
              lat: 55.60315,
            },
            index_strings: [],
            weight: 438605,
            cases: null,
            country_cases: null,
          },
          type: 'round trip',
          departure_at: '2023-05-15T19:20:00+02:00',
          arrival_at: '2023-06-15T19:20:00+02:00',
          duration_to: 1000,
          duration_from: 1200,
          passengers: {
            adults: 1,
            child: 0,
            infant: 0,
          },
          price: 550,
          utcOffset: 'UTC+3',
          destinationUtcOffset: 'UTC+5',
        },
      }),
    );
  }
}
