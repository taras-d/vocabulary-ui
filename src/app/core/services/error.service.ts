import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  readonly defaultErrorMessage = 'Service temporarily unavailable';

  parseError(err: any): string {
    if (err instanceof HttpErrorResponse && err.error && err.error.message) {
      return err.error.message;
    }

    if (err instanceof Error && err.message) {
      return err.message;
    }

    return this.defaultErrorMessage;
  }
}
