import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, AuthModule],
})
export class HomeModule {}
