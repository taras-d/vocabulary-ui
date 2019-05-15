import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from '@core/guards';
import { PageLayoutComponent } from '@shared/components';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    canActivate: [AuthorizedGuard],
    children: [
      {
        path: '',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
