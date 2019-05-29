import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@core/services';
import { BaseComponent } from '@core/utils';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends BaseComponent {
  loading: boolean;
  loginData = { email: '', password: '' };
  message: { type: string, text: string };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  onSubmit(): void {
    this.message = null;
    this.loading = true;

    this.authService.login(this.loginData).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/']);
    }, (err) => {
      this.message = {
        type: 'error',
        text: (err.status === 401) ? 'Incorrect email or password' : 'Service is unavailable.<br>Please try again later.'
      };
      this.loading = false;
    });
  }
}
