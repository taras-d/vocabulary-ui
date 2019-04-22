import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = req.params;
    let headers = req.headers;

    if (params.has('_auth')) {
      params = params.delete('_auth');
      const authToken = localStorage[environment.authTokenKey];
      if (authToken) {
        headers = headers.append('Authorization', `Bearer ${authToken}`);
      }
    }

    return next.handle(req.clone({
      url: `${environment.apiUrl}/${req.url}`,
      headers,
      params
    }));
  }
}