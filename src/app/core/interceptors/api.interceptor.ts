import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const update: any = {
      url: `${environment.apiUrl}/${req.url}`,
      headers: req.headers
    };

    const token = localStorage[environment.authTokenKey];
    if (token) {
      update.headers = req.headers.append('Authorization', `Bearer ${token}`);
    }

    return next.handle(req.clone(update));
  }
}
