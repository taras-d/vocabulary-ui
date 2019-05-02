import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AppStartService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;
  private user: BehaviorSubject<any>;

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
      tap(res => {
        this.user.next(res.user);
        localStorage[environment.authTokenKey] = res.accessToken;
      })
    );
  }

  logout(): Observable<any> {
    delete localStorage[environment.authTokenKey];
    this.user.next(null);
    this.router.navigate(['login']);
    return of(null);
  }
}
