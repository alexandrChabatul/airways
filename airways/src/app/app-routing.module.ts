import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./lazy-loaded-modules/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule,
      ),
  },
  {
    path: 'user-page',
    loadChildren: () =>
      import('./lazy-loaded-modules/user-page/user-page.module').then((m) => m.UserPageModule),
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
  {
    path: 'auth',
    loadChildren: () => import('./lazy-loaded-modules/auth/auth.module').then((m) => m.AuthModule),
    outlet: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
