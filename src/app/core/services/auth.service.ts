import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AppStartService } from '@core/services/app.start.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: BehaviorSubject<any>;
  user: Observable<any>;

  constructor(
    private http: HttpClient,
    private appStartService: AppStartService
  ) {
    this._user = new BehaviorSubject(this.appStartService.preloadedData.user || null);
    this.user = this._user.asObservable();
  }

  login(data: any): Observable<any> {
    return this.http.post(`authentication`, data).pipe(
      tap(res => {
        this._user.next(res.user);
        localStorage[environment.authTokenKey] = res.accessToken;
      })
    );
  }

  logout(): Observable<any> {
    this._user.next(null);
    delete localStorage[environment.authTokenKey];
    return of(null);
  }
}
