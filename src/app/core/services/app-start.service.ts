import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { User } from '@core/models/auth';

@Injectable({ providedIn: 'root' })
export class AppStartService {
  preloadedData: {
    user?: User;
  } = {};

  constructor(private http: HttpClient) {}

  load(): Promise<any> {
    return this.preloadUser().toPromise();
  }

  private preloadUser(): Observable<any> {
    if (!localStorage[environment.authTokenKey]) {
      return of(null);
    }

    return this.http.get(`me`).pipe(
      catchError(() => of(null)),
      tap(user => this.preloadedData.user = user)
    );
  }
}
