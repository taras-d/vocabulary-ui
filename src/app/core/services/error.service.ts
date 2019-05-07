import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private notificationService: NzNotificationService) {

  }

  handleError(err): void {
    if (!environment.production) {
      console.warn(err);
    }

    this.notificationService.error('Error', 'Service is unavailable. Please try again later.');
  }
}
