import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { AuthService } from '@core/services';
import { BaseComponent } from '@core/utils';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends BaseComponent {
  loading: ClrLoadingState = ClrLoadingState.DEFAULT;
  loginData = { email: '', password: '' };
  message: { type: string, text: string };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  login(): void {
    this.message = null;
    this.loading = ClrLoadingState.LOADING;

    this.authService.login(this.loginData).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/']);
    }, (err) => {
      this.message = {
        type: 'danger',
        text: (err.status === 401) ? 'Incorrect email or password' : 'Service is unavailable.<br>Please try again later.'
      };
      this.loading = ClrLoadingState.DEFAULT;
    });
  }
}
