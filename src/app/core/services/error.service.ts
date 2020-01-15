import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { constants } from '@core/constants';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  parseError(err: any): string {
    if (err instanceof HttpErrorResponse && err.error && err.error.message) {
      return err.error.message;
    }

    if (err instanceof Error && err.message) {
      return err.message;
    }

    return constants.defaultErrorMessage;
  }
}
