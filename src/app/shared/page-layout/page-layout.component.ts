import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

import { AuthService } from '@core/services';

@Component({
  selector: 'v-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.less']
})
export class PageLayoutComponent {
  user: any;
  constructor(
    private modalService: NzModalService,
    public authService: AuthService
  ) {

  }

  openProfile(): void {
    this.modalService.info({
      nzTitle: 'Profile page is under construction',
      nzContent: 'Please try again later'
    });
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
