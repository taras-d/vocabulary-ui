import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { AppStartService } from './app.start.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user: any;

  constructor(
    private apiService: ApiService,
    private appStartService: AppStartService
  ) {
    this.user = this.appStartService.preloadedData.user;
  }

  login(data: any): Observable<any> {
    return this.apiService.post('authentication', data).pipe(
      tap(res => {
        this.user = res.user;
        localStorage.setItem(environment.tokenKey, res.accessToken);
      })
    );
  }

  logout(): Observable<any> {
    this.user = null;
    localStorage.removeItem(environment.tokenKey);
    return of(null);
  }
  
}