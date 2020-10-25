import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRequest } from 'projects/calden-lib/src/lib/auth';
import { AuthenticationService } from './authentication.service';
import { untilDestroyed } from '../core/until-destroyed';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  selectedLogo = 'assets/logos/violet_balloon_logo.svg';
  isLoading = false;
  authRequest: AuthRequest;
  error: string | undefined;
  authenticated = false;
  invalidCredentials = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onAuthRequest(authRequest: AuthRequest): void {
    this.authRequest = authRequest;
    if (authRequest.context === 'login') {
      this.login(authRequest);
    }
  }

  login(authRequest: AuthRequest): void {
    this.isLoading = true;
    const login$ = this.authenticationService.login(authRequest);
    login$
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.authenticated = !this.invalidCredentials;
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: () => {
          this.router.navigate([
            this.route.snapshot.queryParams.redirect || '/auth-async'
          ], { replaceUrl: true });
        },
        error: err => this.invalidCredentials = true
      });
  }

  ngOnDestroy(): void {}

}
