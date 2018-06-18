import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, ObservableManager, getErrorMessage } from '../../core/core.module';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;

  message: { type: string, text: string };

  loginForm: FormGroup;

  om: ObservableManager;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.om = new ObservableManager({

      login: {
        create: () => {
          this.message = null;
          this.loading = true;
          return this.authService.login(this.loginForm.value)
        },
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          this.message = { type: 'negative', text: getErrorMessage(err) };
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
