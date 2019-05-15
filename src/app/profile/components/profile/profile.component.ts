import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@core/services';
import { BaseComponent } from '@core/utils';

@Component({
  selector: 'v-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => this.user = user);
  }
}
