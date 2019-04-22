import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loading: boolean;
  loginData = { email: '', password: '' };
  message: { type: string, text: string };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  login(): void {
    if (!this.loginData.email || !this.loginData.password) {
      return;
    }

    this.message = null;
    this.loading = true;

    this.authService.login(this.loginData).subscribe(() => {
      this.router.navigate(['/']);
    }, () => {
      this.message = { type: 'error', text: 'Incorrect email or password' };
      this.loading = false;
    });
  }
}
