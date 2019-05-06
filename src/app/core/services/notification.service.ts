import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService extends NzNotificationService {
  defaultErrorHandler = (err: any) => {
    if (!environment.production) {
      console.error(err);
    }
    this.error(environment.defaultError.title, environment.defaultError.content);
  }
}
