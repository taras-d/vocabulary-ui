import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services';
import { ObservableManager } from '../../core/utils';

@Component({
  selector: 'v-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.less']
})
export class PageLayoutComponent implements OnInit, OnDestroy {

  user: any;

  om: ObservableManager;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.om = new ObservableManager({

      getUser: {
        create: () => this.authService.user,
        next: user => this.user = user
      },

      logout: {
        create: () => this.authService.logout(),
        next: () => this.router.navigate(['login'])
      }

    });
  }

  ngOnInit(): void {
    this.om.invoke('getUser');
  }

  ngOnDestroy(): void {
    this.om.unsubAll();
  }

  onLogout(): void {
    this.om.invoke('logout');
  }

}
