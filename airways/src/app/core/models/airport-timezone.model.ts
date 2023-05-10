export interface AirportTimeZoneInterface {
  code: string;
  timezone: string;
  offset: {
    gmt: number;
    dst: number;
  };
}
