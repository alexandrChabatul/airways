import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDatePickerComponent } from './home-date-picker.component';

describe('HomeDatePickerComponent', () => {
  let component: HomeDatePickerComponent;
  let fixture: ComponentFixture<HomeDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeDatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
