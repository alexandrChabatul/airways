import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserPageRoutingModule } from './user-page-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [UserPageComponent],
  imports: [CommonModule, UserPageRoutingModule, SharedModule],
})
export class UserPageModule {}
