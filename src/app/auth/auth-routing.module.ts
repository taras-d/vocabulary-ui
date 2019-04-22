import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@auth/login/login.component';
import { NotAuthenticatedGuard } from '@core/guards';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthenticatedGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
