export interface AutocompleteResponseInterface {
  id: string;
  type: string;
  code: string;
  name: string;
  country_code: string;
  country_name: string;
  state_code: string | null;
  city_name?: string;
  coordinates: {
    lon: number;
    lat: number;
  };
  index_strings: string[];
  weight: number;
  cases: string | null;
  country_cases: string | null;
  main_airport_name: string | null;
}
