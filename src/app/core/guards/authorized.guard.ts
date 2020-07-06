import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.user) {
      return true;
    } else {
      this.router.navigate(['auth', 'login']);
      return false;
    }
  }
}
