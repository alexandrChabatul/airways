import { TestBed } from '@angular/core/testing';

import { AviasalesApiService } from './aviasales-api.service';

describe('AviasalesApiService', () => {
  let service: AviasalesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AviasalesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
