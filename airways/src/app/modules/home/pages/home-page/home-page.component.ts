import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDateFormatInUppercase } from 'src/app/core/store/selectors/formats.selectors';

@Component({
  selector: 'airways-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  dateFormat$!: Observable<string>;

  searchForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateFormat$ = this.store.select(selectDateFormatInUppercase);
    this.initializeForms();
  }

  initializeForms(): void {
    this.searchForm = this.fb.group({
      tripType: ['round-trip', [Validators.required]],
    });
  }

  swapFields() {
    const from = this.searchForm.controls['from'].value;
    const destination = this.searchForm.controls['destination'].value;
    if (from && destination) {
      this.searchForm.controls['destination'].setValue(from);
      this.searchForm.controls['from'].setValue(destination);
    }
  }

  onSearchFormSubmit(): void {
    console.log(this.searchForm);
    if (this.searchForm.valid) {
      console.log('valid');
    } else {
      this.searchForm.setErrors({ formSubmit: true });
    }
  }
}
