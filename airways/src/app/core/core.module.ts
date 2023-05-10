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

@NgModule({
  declarations: [HeaderComponent, FooterComponent, EditFlightComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialDesignModule,
    HttpClientModule,
    StoreModule.forFeature('formats', formatsReducer),
  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AviasalesApiInterceptor, multi: true }],
})
export class CoreModule {}
