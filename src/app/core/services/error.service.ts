import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor() {

  }

  private getErrorMessage(err: any): string {
    return (err instanceof HttpErrorResponse && err.error && err.error.message) ?
      err.error.message : 'Service is unavailable. Please try again later.';
  }
}
