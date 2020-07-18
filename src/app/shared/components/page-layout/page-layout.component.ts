import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { User } from '@core/models/auth';

@Component({
  selector: 'v-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.less']
})
export class PageLayoutComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logout(): void {
    this.authService.logout();
  }
}
