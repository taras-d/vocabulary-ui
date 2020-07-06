import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class UnauthorizedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.user) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
