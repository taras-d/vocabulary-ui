import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AppStartService } from './app-start.service';
import { User, AuthResult } from '@core/models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private appStartService: AppStartService
  ) {
    this.user = this.appStartService.preloadedData.user || null;
  }

  login(data: any): Observable<any> {
    return this.http.post(`authentication`, data).pipe(
      tap((res: AuthResult) => {
        this.user = res.user;
        localStorage[environment.authTokenKey] = res.accessToken;
      })
    );
  }

  logout(): void {
    delete localStorage[environment.authTokenKey];
    this.user = null;
    this.router.navigate(['auth', 'login']);
  }
}
