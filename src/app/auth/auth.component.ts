import { Component, OnInit } from '@angular/core';
import { AuthContextType, AuthRequest } from 'projects/calden-lib/src/lib/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  selectedLogo = 'assets/logos/violet_balloon_logo.svg';
  logos = [
    {value: 'assets/logos/violet_balloon_logo.svg', name: 'Violet balloon logo'},
    {value: 'assets/logos/upside_kart_logo.png', name: 'Upside kart logo'}
  ];
  authRequest: AuthRequest = {context: 'login', username: '', password: '', remember: false};
  forgotPasswordEmitted = 0;
  lastContextSwitch = '';
  isLoading = false;
  confirmSignup = false;
  invalidCredentials = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAuthRequest(authRequest: AuthRequest): void {
    this.authRequest = authRequest;
  }

  onForgotPassword(): void {
    this.forgotPasswordEmitted += 1;
  }

  onContextSwitch(newContext: AuthContextType): void {
    this.lastContextSwitch = newContext;
    if (newContext === 'login') {
      this.confirmSignup = false;
    }
  }

}
