import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  {
    path: 'auth',
    loadChildren: () => import('./lazy-loaded-modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
