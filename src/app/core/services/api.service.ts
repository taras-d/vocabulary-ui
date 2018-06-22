import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface ApiRequestOptions {
  params?: { [key: string]: any };
  headers?: { [key: string]: any };
  tokenize?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  observe?: 'body' | 'response' | 'events';
}

@Injectable({ providedIn: 'root' })
export class ApiService {

  static readonly baseUrl = environment.apiUrl;

  static readonly defaultOptions = {
    tokenize: true,
    responseType: 'json',
    observe: 'body'
  };

  constructor(private http: HttpClient) {

  }

  get(path: string, options?: ApiRequestOptions): Observable<any> {
    return this.request('GET', path, null, options);
  }

  post(path: string, body?: any, options?: ApiRequestOptions): Observable<any> {
    return this.request('POST', path, body, options);
  }

  put(path: string, body?: any, options?: ApiRequestOptions): Observable<any> {
    return this.request('PUT', path, body, options);
  }

  patch(path: string, body?: any, options?: ApiRequestOptions): Observable<any> {
    return this.request('PATCH', path, body, options);
  }

  delete(path: string, body?: any, options?: ApiRequestOptions): Observable<any> {
    return this.request('DELETE', path, body, options);
  }

  head(path: string, options?: ApiRequestOptions): Observable<any> {
    return this.request('HEAD', path, null, options);
  }

  request(
    method: string,
    path: string,
    body: any,
    options: ApiRequestOptions
  ): Observable<any> {
    options = Object.assign({}, ApiService.defaultOptions, options);

    const url = this.getUrl(path);

    return this.http.request(method, url, {
      body,
      headers: this.getHeaders(options),
      params: options.params,
      responseType: options.responseType,
      observe: options.observe
    });
  }

  private getUrl(path: string): string {
    return `${ApiService.baseUrl}/${path}`.replace(/([^:]\/)\/+/g, '$1');
  }

  private getHeaders(options: ApiRequestOptions): { [key: string]: any } {
    const headers = {};

    if (options.tokenize) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return Object.assign(headers, options.headers);
  }

  private getAuthToken(): string {
    return localStorage.getItem(environment.authTokenKey);
  }

}
