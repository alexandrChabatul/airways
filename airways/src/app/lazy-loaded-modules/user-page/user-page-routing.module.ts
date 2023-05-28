import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: UserPageComponent },
  { path: 'details', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
