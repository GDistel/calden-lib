import { Injectable } from '@angular/core';
import { Credentials } from './auth.interfaces';
import { AuthApiService } from './auth-api.service';
import { take } from 'rxjs/operators';

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  public credentials: Credentials | null = null;
  public refreshTokenTimeout: ReturnType<typeof setTimeout>;
  public refreshTokenCallback = (): void => {
    if (this.credentials && this.credentials.refresh) {
      this.authApiSvc.refreshToken(this.credentials.refresh)
        .pipe(take(1))
        .subscribe({
          next: response => {
            this.credentials.access = response.access;
            this.stopRefreshTokenTimer();
            const rememberCredentials = this.rememberCredentials();
            this.setCredentials(this.credentials, rememberCredentials);
          },
          error: err => console.log(`Refresh token error:\n${err}`),
        });
    }
  }

  constructor(private authApiSvc: AuthApiService) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  rememberCredentials(): boolean {
    const localStorageCreds = localStorage.getItem(credentialsKey);
    return !!localStorageCreds;
  }

  setCredentials(credentials?: Credentials, remember?: boolean): void {
    this.credentials = credentials || null;
    sessionStorage.removeItem(credentialsKey);
    localStorage.removeItem(credentialsKey);
    if (!credentials) {
      return;
    }
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(credentialsKey, JSON.stringify(credentials));
    this.startRefreshTokenTimer();
  }

  startRefreshTokenTimer(): void {
    const jwtAccessToken = JSON.parse(atob(this.credentials.access.split('.')[1]));
    const expires = new Date(jwtAccessToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(this.refreshTokenCallback, timeout);
  }

  stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

}
