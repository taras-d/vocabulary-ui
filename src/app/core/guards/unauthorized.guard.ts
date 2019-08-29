import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { User } from '@core/models/auth';

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
    return this.authService.user$.pipe(
      map((user: User) => {
        if (user) {
          this.router.navigate(['']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
