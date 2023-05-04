import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTimeComponent } from './flight-time.component';

describe('FlightTimeComponent', () => {
  let component: FlightTimeComponent;
  let fixture: ComponentFixture<FlightTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
