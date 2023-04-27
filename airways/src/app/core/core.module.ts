import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { StoreModule } from '@ngrx/store';
import { formatsReducer } from './store/reducers/formats.reducers';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialDesignModule,
    HttpClientModule,
    StoreModule.forFeature('formats', formatsReducer),
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
