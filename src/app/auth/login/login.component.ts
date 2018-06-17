import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'v-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loading: boolean;

  message: { type: string, text: string };

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

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

  onLogin(): void {
    console.log(this.loginForm.value);

    this.message = null;
    this.loading = true;
    
    setTimeout(() => {
      this.message = { type: 'negative', text: 'Incorrect email or password' };
      this.loading = false;
    }, 600);
  }

}
