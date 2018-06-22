import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { AppStartService } from './app.start.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user: BehaviorSubject<any>;
  user: Observable<any>;

  constructor(
    private apiService: ApiService,
    private appStartService: AppStartService
  ) {
    this._user = new BehaviorSubject(this.appStartService.preloadedData.user || null);
    this.user = this._user.asObservable();
  }

  login(data: any): Observable<any> {
    return this.apiService.post('authentication', data).pipe(
      tap(res => {
        this._user.next(res.user);
        localStorage.setItem(environment.authTokenKey, res.accessToken);
      })
    );
  }

  logout(): Observable<any> {
    this._user.next(null);
    localStorage.removeItem(environment.authTokenKey);
    return of(null);
  }

}
