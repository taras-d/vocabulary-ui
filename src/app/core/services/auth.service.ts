import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AppStartService } from './app-start.service';
import { User, AuthResult } from '@core/models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User>;
  private user: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private appStartService: AppStartService
  ) {
    this.user = new BehaviorSubject(this.appStartService.preloadedData.user || null);
    this.user$ = this.user.asObservable();
  }

  login(data: any): Observable<any> {
    return this.http.post(`authentication`, data).pipe(
      tap((res: AuthResult) => {
        this.user.next(res.user);
        localStorage[environment.authTokenKey] = res.accessToken;
      })
    );
  }

  logout(): Observable<null> {
    delete localStorage[environment.authTokenKey];
    this.user.next(null);
    this.router.navigate(['auth', 'login']);
    return of(null);
  }
}
