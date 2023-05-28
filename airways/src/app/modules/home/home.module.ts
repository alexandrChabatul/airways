import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/core/store/reducers/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UpdateOrderEffect } from 'src/app/core/store/effects/update-order.effects';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forFeature('order', reducer),
    EffectsModule.forFeature(UpdateOrderEffect),
    SharedModule,
  ],
})
export class HomeModule {}
