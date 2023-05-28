import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserPageRoutingModule } from './user-page-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { userDetailsReducer } from '../../core/store/reducers/user-details.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [UserPageComponent, DetailsComponent],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    SharedModule,
    MaterialDesignModule,
    StoreModule.forFeature('details', userDetailsReducer),
  ],
})
export class UserPageModule {}
