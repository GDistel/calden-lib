import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let errorHandlerInterceptor: ErrorHandlerInterceptor;
  const authenticationSvc = jasmine.createSpyObj('authenticationSvc', ['logout']);
  const credentialsSvc = jasmine.createSpyObj('credentialsSvc', {credentials: false});
  const errorHandler = jasmine.createSpyObj('errorHandlerInterceptor', ['errorHandler']);

  function createInterceptor() {
    errorHandlerInterceptor = new ErrorHandlerInterceptor(authenticationSvc, credentialsSvc);
    return errorHandlerInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: createInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch 404 error, call error handler but not logout', () => {
    // Act
    http.get(environment.serverUrl + 'toto').subscribe({
      next: () => fail('should error'),
      error: err => {
        // Assert
        expect(authenticationSvc.logout).not.toHaveBeenCalled();
      }
    });

    httpMock.expectOne({url: environment.serverUrl + 'toto'}).flush(null, {
      status: 404,
      statusText: 'not found',
    });
  });

  it('should catch 401 error, call error handler and logout', () => {
    // Act
    http.get(environment.serverUrl + 'toto').subscribe({
      next: () => fail('should error'),
      error: err => {
        // Assert
        expect(authenticationSvc.logout).toHaveBeenCalled();
      }
    });

    httpMock.expectOne({url: environment.serverUrl + 'toto'}).flush(null, {
      status: 401,
      statusText: 'unathorized',
    });
  });

  it('should catch 403 error, call error handler and logout', () => {
    // Act
    http.get(environment.serverUrl + 'toto').subscribe({
      next: () => fail('should error'),
      error: err => {
        // Assert
        expect(authenticationSvc.logout).toHaveBeenCalled();
      }
    });

    httpMock.expectOne({url: environment.serverUrl + 'toto'}).flush(null, {
      status: 403,
      statusText: 'forbidden',
    });
  });

});
