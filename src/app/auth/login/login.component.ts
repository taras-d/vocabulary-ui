import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { AuthService } from '@core/services/auth.service';
import { BaseComponent } from '@shared/components/base/base.component';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends BaseComponent {
  user = { email: '', password: '' };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  login(): void {
    if (!this.user.email || !this.user.password) {
      return;
    }

    this.message = null;
    this.loading = ClrLoadingState.LOADING;

    this.authService.login(this.user).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/']);
    }, (err) => {
      this.message = {
        type: 'danger',
        text: (err.status === 401) ? 'Incorrect email or password' : 'Service temporarily unavailable'
      };
      this.loading = ClrLoadingState.DEFAULT;
    });
  }
}
