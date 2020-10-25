import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../auth/authentication.service';
import { CredentialsService } from '../../auth/credentials.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
      private authenticationSvc: AuthenticationService,
      private credentialsSvc: CredentialsService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => this.errorHandler(err)));
    }

    private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
      if ([401, 403].includes(error.status) && this.credentialsSvc.credentials) {
        this.authenticationSvc.logout();
      }
      const errorResponse = (error && error.error && error.error.message) || error.statusText;
      return throwError(errorResponse);
    }
}
