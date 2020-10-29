import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CaldenAuthConfig } from './auth.config';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private authConfig: CaldenAuthConfig
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }
    this.router.navigate([this.authConfig.urls.authGuardRedirect], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
