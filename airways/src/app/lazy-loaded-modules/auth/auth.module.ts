import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { AuthPageComponent } from './pages/auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialNetworkSignupComponent } from './components/social-network-signup/social-network-signup.component';
import { SignupPageComponent } from './pages/signup-page/signup.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DividerComponent } from './components/divider/divider.component';

@NgModule({
  declarations: [
    AuthPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    SocialNetworkSignupComponent,
    DividerComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, MaterialDesignModule, ReactiveFormsModule],
  exports: [AuthPageComponent],
})
export class AuthModule {}
