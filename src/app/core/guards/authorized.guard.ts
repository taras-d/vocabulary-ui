import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '@core/services';

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
    return this.authService.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['auth', 'login']);
          return false;
        }
      })
    );
  }
}
