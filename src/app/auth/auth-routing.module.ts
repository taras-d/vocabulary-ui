import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UnauthorizedGuard } from '@core/guards';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthorizedGuard]
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
