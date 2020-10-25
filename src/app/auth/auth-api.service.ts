import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'projects/calden-lib/src/lib/auth';
import { Observable } from 'rxjs';
import { AuthRequest } from 'projects/calden-lib/src/lib/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) { }

  getTokens(authRequest: AuthRequest): Observable<Credentials> {
    const requestBody = {
      username: authRequest.username,
      password: authRequest.password,
    };
    return this.http.post<Credentials>('token/', requestBody);
  }

  refreshToken(refreshToken: string): Observable<Credentials> {
    return this.http.post<Credentials>(
      'token/refresh/', { refresh: refreshToken }
    );
  }

}
