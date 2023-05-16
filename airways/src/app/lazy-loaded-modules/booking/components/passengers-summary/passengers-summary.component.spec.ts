import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersSummaryComponent } from './passengers-summary.component';

describe('PassengersSummaryComponent', () => {
  let component: PassengersSummaryComponent;
  let fixture: ComponentFixture<PassengersSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
