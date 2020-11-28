import { AuthRequest, Credentials } from 'projects/calden-lib/src/lib/auth';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthApiService } from './auth-api.service';
import { CaldenAuthConfig } from './auth.config';
import { mockAuthConfig } from './auth.config.mock';
import { AuthenticationService } from './auth.service';
import { CredentialsService } from './credentials.service';
import { of } from 'rxjs';

describe('Auth service', () => {

  let authSvc: AuthenticationService;
  let authConfig: CaldenAuthConfig;
  let credentialsServiceSpy: any;
  let credentialsService: any;
  let authApiServiceSpy: any;
  let authApiSvc: any;
  let router: Router;

  beforeEach(() => {
    credentialsServiceSpy = jasmine.createSpyObj('CredentialsService', ['setCredentials', 'stopRefreshTokenTimer']);
    authApiServiceSpy = jasmine.createSpyObj('AuthApiService', ['getTokens']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthenticationService,
        { provide: CaldenAuthConfig, useValue: mockAuthConfig },
        { provide: AuthApiService, useValue: authApiServiceSpy },
        { provide: CredentialsService, useValue: credentialsServiceSpy }
      ]
    });

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    authConfig = TestBed.inject(CaldenAuthConfig);
    authSvc = TestBed.inject(AuthenticationService);
    credentialsService = TestBed.inject(CredentialsService);
    authApiSvc = TestBed.inject(AuthApiService);
  });

  it('should log the user in', () => {
    const credentials: Credentials = {
      username: 'mary',
      access: 'abc123',
      refresh: 'xyz456'
    };
    const credentials$ = of(credentials);
    authApiServiceSpy.getTokens.and.returnValue(credentials$);
    const authRequest: AuthRequest = {
      context: 'login',
      username: 'mary',
      password: '12341234',
      remember: false
    };

    authSvc.login(authRequest).subscribe(creds => {
      expect(creds).toBe(credentials);
    });
    expect(authApiSvc.getTokens).toHaveBeenCalledWith(authRequest);
    expect(credentialsService.setCredentials).toHaveBeenCalledWith(credentials, authRequest.remember);
  });

  it('should log the user out', () => {
    authSvc.logout();
    expect(credentialsService.setCredentials).toHaveBeenCalledWith(null);
    expect(credentialsService.stopRefreshTokenTimer).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([authConfig.urls.logoutRedirect]);
  });

});
