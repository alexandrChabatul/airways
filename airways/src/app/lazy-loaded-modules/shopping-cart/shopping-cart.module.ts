import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { CartRowComponent } from './components/cart-row/cart-row.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [ShoppingCartPageComponent, CartRowComponent],
  imports: [CommonModule, ShoppingCartRoutingModule, MaterialDesignModule, FormsModule, CoreModule],
})
export class ShoppingCartModule {}
