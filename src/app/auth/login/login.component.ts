import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '@core/services';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loading: boolean;
  loginData = { email: '', password: '' };
  message: { type: string, text: string };

  @ViewChild(NgForm) loginForm: NgForm;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  onSubmit(): void {
    this.message = null;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginData).subscribe(() => {
      this.router.navigate(['/']);
    }, () => {
      this.message = { type: 'error', text: 'Incorrect email or password' };
      this.loading = false;
    });
  }
}
