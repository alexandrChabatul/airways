import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { StoreModule } from '@ngrx/store';
import { formatsReducer } from './store/reducers/formats.reducers';
import { AviasalesApiInterceptor } from './interceptors/aviasales-api.interceptor';
import { EditFlightComponent } from './components/edit-flight/edit-flight.component';
import { authReducer } from './store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { EditMenuComponent } from './components/edit-menu/edit-menu.component';
import { SharedModule } from '../modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { cartReducer } from './store/reducers/cart.reducers';
import { CartEffects } from './store/effects/cart.effects';
import { ExchangeRateEffect } from './store/effects/exchange-rate.effect';
import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducers';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, EditFlightComponent, EditMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialDesignModule,
    HttpClientModule,
    StoreModule.forFeature('formats', formatsReducer),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([AuthEffects, CartEffects, ExchangeRateEffect, UserEffects]),
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AviasalesApiInterceptor, multi: true }],
})
export class CoreModule {}
