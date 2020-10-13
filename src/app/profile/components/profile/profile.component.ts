import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { User } from '@core/models/auth';

@Component({
  selector: 'v-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }
}
