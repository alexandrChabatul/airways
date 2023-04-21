import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { SignupPageComponent } from './modules/auth/pages/signup-page/signup-page.component';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'signup', component: SignupPageComponent },
    ],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./lazy-loaded-modules/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule,
      ),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./lazy-loaded-modules/booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./lazy-loaded-modules/account/account.module').then((m) => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
