import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, TimeoutError } from 'rxjs';
import { AuthService } from 'services/auth/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(public jwtHelper: JwtHelperService, private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.token}`
      })
      request = request.clone({ headers })
    }

    return next.handle(request).pipe(
      tap(
        (event: any) => { },
        (response: HttpErrorResponse | TimeoutError) => {
          if (response instanceof HttpErrorResponse) {
            if (request.url.includes('/ReCaptchaSiteKey') && response.status === 401) {
              // this.authService.userLogout();
            }
          }
        })
    );
  }
}
