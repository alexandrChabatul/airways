import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper'; 


@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatButtonModule, 
    MatToolbarModule,
    MatStepperModule,
  ]
})
export class MaterialDesignModule { }
