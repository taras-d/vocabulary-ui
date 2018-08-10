import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services';
import { ObserverManager } from '../../core/utils';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;

  message: { type: string, text: string };

  loginForm: FormGroup;

  om: ObserverManager;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.om = new ObserverManager({

      login: {
        create: () => {
          this.message = null;
          this.loading = true;
          return this.authService.login(this.loginForm.value);
        },
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          this.message = { type: 'error', text: 'Incorrect email or password' };
          this.loading = false;
        }
      }

    });
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.om.unsubAll();
  }

  onLogin(): void {
    this.om.invoke('login');
  }

}
