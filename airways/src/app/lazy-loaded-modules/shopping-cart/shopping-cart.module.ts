import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';

@NgModule({
  declarations: [ShoppingCartPageComponent],
  imports: [CommonModule, ShoppingCartRoutingModule],
})
export class ShoppingCartModule {}
