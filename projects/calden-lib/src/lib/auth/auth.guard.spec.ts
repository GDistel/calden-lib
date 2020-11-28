import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from './credentials.service';
import { AuthenticationGuard } from './auth.guard';
import { CaldenAuthConfig } from './auth.config';

const mockAuthConfig: CaldenAuthConfig = {
  urls: {
    token: 'token/',
    refreshToken: 'token/refresh/',
    authGuardRedirect: '/auth-async',
    logoutRedirect: ''
  }
};

describe('AuthenticationGuard', () => {
  let authenticationGuard: AuthenticationGuard;
  let authConfig: CaldenAuthConfig;
  let credentialsServiceSpy: any;
  let router: Router;
  let mockSnapshot: any;

  beforeEach(() => {

    credentialsServiceSpy = jasmine.createSpyObj('CredentialsService', ['isAuthenticated']);
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthenticationGuard,
        { provide: CaldenAuthConfig, useValue: mockAuthConfig },
        { provide: CredentialsService, useValue: credentialsServiceSpy }
      ],
    });

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    authConfig = TestBed.inject(CaldenAuthConfig);
    authenticationGuard = TestBed.inject(AuthenticationGuard);
  });

  it('should have a canActivate method', () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  it('should return true if user is authenticated', () => {
    credentialsServiceSpy.isAuthenticated.and.returnValue(true);
    expect(authenticationGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBe(true);
  });

  it('should return false and redirect the user if he/she is not authenticated', () => {

    credentialsServiceSpy.isAuthenticated.and.returnValue(false);

    const result = authenticationGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);

    expect(router.navigate).toHaveBeenCalledWith([authConfig.urls.authGuardRedirect], {
      queryParams: { redirect: undefined },
      replaceUrl: true
    });

    expect(result).toBe(false);

  });

});
