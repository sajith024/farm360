import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE } from '../local-storage.service';
import { AuthToken } from '../../model/auth/auth-user';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenData = this.localStorage.getItem('token');
    if (!request.url.includes('/api/login/') && tokenData) {
      const token: AuthToken = JSON.parse(tokenData);
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token.access}`),
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
