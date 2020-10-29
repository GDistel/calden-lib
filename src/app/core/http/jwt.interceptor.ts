import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CredentialsService } from 'projects/calden-lib/src/lib/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(private credentialsSvc: CredentialsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const credentials = this.credentialsSvc.credentials;
        const isServerUrl = request.url.startsWith(environment.serverUrl);
        if (credentials && isServerUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${credentials.access}` }
            });
        }

        return next.handle(request);
    }
}
