import { TestBed } from '@angular/core/testing';

import { AviasalesApiInterceptor } from './aviasales-api.interceptor';

describe('AviasalesApiInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AviasalesApiInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: AviasalesApiInterceptor = TestBed.inject(AviasalesApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
