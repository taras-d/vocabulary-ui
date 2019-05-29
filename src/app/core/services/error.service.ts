import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private notificationService: NzNotificationService) {

  }

  handleError(err: any): void {
    if (!environment.production) {
      console.warn(err);
    }

    this.notificationService.error('Error', this.getErrorMessage(err));
  }

  private getErrorMessage(err: any): string {
    return (err instanceof HttpErrorResponse && err.error && err.error.message) ?
      err.error.message : 'Service is unavailable. Please try again later.';
  }
}
