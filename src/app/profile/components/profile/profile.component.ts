import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { BaseComponent } from '@core/utils';
import { User } from '@core/models/auth';

@Component({
  selector: 'v-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((user: User) => this.user = user);
  }
}
