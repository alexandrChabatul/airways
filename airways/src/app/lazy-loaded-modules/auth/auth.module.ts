import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthPageComponent } from './pages/auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialNetworkSignupComponent } from './components/social-network-signup/social-network-signup.component';

@NgModule({
  declarations: [AuthPageComponent, LoginComponent, SignupComponent, SocialNetworkSignupComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialDesignModule, ReactiveFormsModule],
  exports: [AuthPageComponent],
})
export class AuthModule {}
