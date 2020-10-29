import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'projects/calden-lib/src/lib/auth';
import { Observable } from 'rxjs';
import { AuthRequest } from 'projects/calden-lib/src/lib/auth';
import { CaldenAuthConfig } from 'projects/calden-lib/src/lib/auth/auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient,
    private authConfig: CaldenAuthConfig
  ) { }

  getTokens(authRequest: AuthRequest): Observable<Credentials> {
    const requestBody = {
      username: authRequest.username,
      password: authRequest.password,
    };
    return this.http.post<Credentials>(this.authConfig.urls.token, requestBody);
  }

  refreshToken(refreshToken: string): Observable<Credentials> {
    return this.http.post<Credentials>(
      this.authConfig.urls.refreshToken, { refresh: refreshToken }
    );
  }

}
