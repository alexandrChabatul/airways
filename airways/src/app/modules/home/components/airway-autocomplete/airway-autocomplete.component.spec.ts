import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirwayAutocompleteComponent } from './airway-autocomplete.component';

describe('AirwayAutocompleteComponent', () => {
  let component: AirwayAutocompleteComponent;
  let fixture: ComponentFixture<AirwayAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirwayAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirwayAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
