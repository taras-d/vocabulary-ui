import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@core/services';
import { BaseComponent } from '@core/utils';
import { environment } from '@env/environment';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends BaseComponent {
  loading: boolean;
  loginData = { email: '', password: '' };
  message: { type: string, text: string };

  @ViewChild('loginForm') loginForm: NgForm;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  onSubmit(): void {
    this.message = null;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginData).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/']);
    }, (err) => {
      this.message = {
        type: 'error',
        text: (err.status === 401) ? 'Incorrect email or password' : environment.defaultError.content
      };
      this.loading = false;
    });
  }
}
