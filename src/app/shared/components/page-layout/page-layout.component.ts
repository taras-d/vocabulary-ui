import { Component } from '@angular/core';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'v-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.less']
})
export class PageLayoutComponent {
  constructor(
    private authService: AuthService
  ) {

  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
