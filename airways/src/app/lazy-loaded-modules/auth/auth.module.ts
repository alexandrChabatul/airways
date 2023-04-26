import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthPageComponent } from './pages/auth-page.component';

@NgModule({
  declarations: [AuthPageComponent, LoginComponent, SignupComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialDesignModule],
  exports: [AuthPageComponent],
})
export class AuthModule {}
