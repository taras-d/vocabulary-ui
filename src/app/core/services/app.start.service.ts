import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AppStartService {
  preloadedData: {[key: string]: any} = {};

  constructor(
    private http: HttpClient
  ) {

  }

  load(): Promise<any> {
    return this.preloadUser().toPromise();
  }

  preloadUser(): Observable<any> {
    if (!localStorage.getItem(environment.authTokenKey)) {
      return of(null);
    }

    return this.http.get(`${environment.apiUrl}/me`).pipe(
      catchError(() => of(null)),
      tap(user => this.preloadedData.user = user)
    );
  }

}
