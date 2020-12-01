import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';
import { Credentials } from './auth.interfaces';
import { CredentialsService, credentialsKey } from './credentials.service';

describe('Credentials service', () => {
  let credentialsSvc: CredentialsService;
  let authApiServiceSpy: any;
  let authApiSvc: AuthApiService;
  const credentials: Credentials = {
    username: 'mary',
    access: 'access123',
    refresh: 'refresh123'
  };

  beforeEach(() => {
    authApiServiceSpy = jasmine.createSpyObj('AuthApiService', ['getTokens']);
    let store = {};
    const mockLocalStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
          store[key] = `${value}`;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
    const mockSessionStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
          store[key] = `${value}`;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        }
    };
    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem')
      .and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear')
      .and.callFake(mockSessionStorage.clear);

    TestBed.configureTestingModule({
      providers: [
        CredentialsService,
        { provide: AuthApiService, useValue: authApiServiceSpy },
      ]
    });

    credentialsSvc = TestBed.inject(CredentialsService);
    authApiSvc = TestBed.inject(AuthApiService);
  });

  it('should save the credentials as a property and also in local storage, if the user wants to be remembered', () => {
    spyOn(credentialsSvc, 'startRefreshTokenTimer').and.callFake(() => null);
    const remember = true;
    credentialsSvc.setCredentials(credentials, remember);
    expect(credentialsSvc.credentials).toBe(credentials);
    expect(localStorage.getItem(credentialsKey)).toBe(JSON.stringify(credentials));
  });

  it('should save the credentials as a property and also in session storage, if the user is not to be remembered', () => {
    spyOn(credentialsSvc, 'startRefreshTokenTimer').and.callFake(() => null);
    const remember = false;
    credentialsSvc.setCredentials(credentials, remember);
    expect(credentialsSvc.credentials).toBe(credentials);
    expect(sessionStorage.getItem(credentialsKey)).toBe(JSON.stringify(credentials));
  });

  it('should tell whether the user credentials are being remembered (i.e. they have been saved to local storage)', () => {
    localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    expect(credentialsSvc.rememberCredentials()).toBe(true);
    localStorage.clear();
    expect(credentialsSvc.rememberCredentials()).toBe(false);
  });

  it('should tell whether the user is authenticated', () => {
    spyOn(credentialsSvc, 'startRefreshTokenTimer').and.callFake(() => null);
    expect(credentialsSvc.isAuthenticated()).toBe(false);
    credentialsSvc.setCredentials(credentials, true);
    expect(credentialsSvc.isAuthenticated()).toBe(true);
  });

  // fit('should clear the refresh token timer', () => {
  //   spyOn(window, 'setTimeout').and.callFake(() => { });
  //   credentialsSvc.refreshTokenTimeout = setTimeout(() => null, 9000);
  //   credentialsSvc.stopRefreshTokenTimer();
  //   expect(credentialsSvc.refreshTokenTimeout).toBeFalsy();
  // });

});
