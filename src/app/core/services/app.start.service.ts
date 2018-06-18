import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AppStartService {

  preloadedData: any = {};

  constructor(private apiService: ApiService) {

  }

  load(): Promise<any> {
    return this.preloadUser().toPromise();
  }

  preloadUser(): Observable<any> {
    if (!localStorage.getItem(environment.tokenKey)) {
      return of(null);
    }

    return this.apiService.get('me').pipe(
      catchError(() => of(null)),
      tap(user => this.preloadedData.user = user)
    );
  }

}