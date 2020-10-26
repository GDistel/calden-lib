import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CredentialsService } from './credentials.service';
import { AuthApiService } from './auth-api.service';
import { Credentials, AuthRequest } from 'projects/calden-lib/src/lib/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private authApiSvc: AuthApiService,
    private credentialsService: CredentialsService
  ) {}

  login(authRequest: AuthRequest): Observable<Credentials> {
    const loginObservable = this.authApiSvc.getTokens(authRequest).pipe(tap({
        next: credentials => this.credentialsService.setCredentials(credentials, authRequest.remember)
    }));
    return loginObservable;
  }

  logout(): void {
    this.credentialsService.setCredentials(null);
    this.credentialsService.stopRefreshTokenTimer();
    this.router.navigate(['/']);
  }
}
