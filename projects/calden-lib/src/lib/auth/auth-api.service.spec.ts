import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';
import { CaldenAuthConfig } from './auth.config';
import { AuthRequest } from './auth.interfaces';

describe('Auth api service', () => {

  let authApiSvc: AuthApiService;
  let httpTestingController: HttpTestingController;
  const caldenAuthConfig = {
    urls: {
      token: 'token/',
      refreshToken: 'token/refresh/',
    }
  };
  const mockedCredentials = {
    username: 'test',
    access: 'asdf123',
    refresh: 'ref123'
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthApiService,
        {
          provide: CaldenAuthConfig,
          useValue: caldenAuthConfig
        }
      ]
    });

    authApiSvc = TestBed.inject(AuthApiService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('Should get access and refresh tokens', () => {
    const authRequest = {
      context: 'login',
      username: 'test',
      password: '123',
      remember: false
    } as AuthRequest;

    authApiSvc.getTokens(authRequest).subscribe(credentials => {
      expect(credentials).toBeTruthy('No credentials returned');
      expect(credentials).toBe(mockedCredentials);
    });

    const req = httpTestingController.expectOne('token/');
    expect(req.request.method).toEqual('POST');
    req.flush(mockedCredentials);
  });

  it('Should only send username and password in the request body', () => {
    const authRequest = {
      context: 'login',
      username: 'test',
      password: '123',
      remember: false
    } as AuthRequest;

    authApiSvc.getTokens(authRequest).subscribe();

    const req = httpTestingController.expectOne('token/');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({username: 'test', password: '123'});
  });

  it('Should get credentials with refresh token', () => {
    const refreshToken = '123';

    authApiSvc.refreshToken(refreshToken).subscribe(credentials => {
      expect(credentials).toBeTruthy('No credentials returned');
      expect(credentials).toBe(mockedCredentials);
    });

    const req = httpTestingController.expectOne('token/refresh/');
    expect(req.request.method).toEqual('POST');
    req.flush(mockedCredentials);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
