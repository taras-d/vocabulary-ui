import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from '@core/guards/authorized.guard';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
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
