import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthRequest, AuthContextType } from './auth.interfaces';
import { equalValueValidator, EqualPasswordsErrorStateMatcher } from './auth.utils';

@Component({
  selector: 'calden-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class CaldenAuthComponent implements OnInit {
  @Input() logo: string;
  @Input() isLoading = false;
  @Input() confirmSignup = false;
  @Input() minPasswordLength = 8;
  @Input() usernameValidPattern = '[^ @]+@[^ @]+';
  @Input() validUserMessage = 'Must be an email';
  @Input() invalidCredentials = false;
  @Output() forgotPassword = new EventEmitter<void>();
  @Output() authRequest = new EventEmitter<AuthRequest>();
  @Output() contextSwitch = new EventEmitter<AuthContextType>();

  context: AuthContextType = 'login';
  rememberMe = false;
  form: FormGroup;
  equalPasswordsMatcher = new EqualPasswordsErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.pattern(this.usernameValidPattern)),
      password: new FormControl('', Validators.minLength(this.minPasswordLength)),
      confirmPassword: new FormControl(),
    }, equalValueValidator);
  }

  isLoginContext(): boolean {
    return !this.isLoading && (this.context === 'login');
  }

  isSignupContext(): boolean {
    return !this.isLoading && (this.context === 'sign up');
  }

  onForgotPassword(): void {
    this.forgotPassword.emit();
  }

  onSwitchContext(): void {
    if (this.confirmSignup) {
      this.confirmSignup = false;
      this.context = 'login';
      this.contextSwitch.emit('login');
      return;
    }
    if (this.context === 'login') {
      this.context = 'sign up';
      this.contextSwitch.emit('sign up');
      return;
    }
    if (this.context === 'sign up') {
      this.context = 'login';
      this.contextSwitch.emit('login');
    }
  }

  onMainContextAction(): void {
    if (this.isSignupContext() && !this.form.valid) {
      return;
    }
    const authRequestData = {
      context: this.context,
      username: this.form.value.username,
      password: this.form.value.password,
      remember: this.rememberMe
    };
    this.authRequest.emit(authRequestData);
    this.form.reset();
  }

}
