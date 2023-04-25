import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent, AuthPageComponent],
  imports: [CommonModule, MaterialDesignModule],
  exports: [SignupComponent, LoginComponent, AuthPageComponent],
})
export class AuthModule {}
