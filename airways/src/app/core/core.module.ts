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

@NgModule({
  declarations: [HeaderComponent, FooterComponent, EditFlightComponent, EditMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialDesignModule,
    HttpClientModule,
    StoreModule.forFeature('formats', formatsReducer),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AviasalesApiInterceptor, multi: true }],
})
export class CoreModule {}
