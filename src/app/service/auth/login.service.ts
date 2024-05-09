import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../local-storage.service';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AppResponse } from '../../model/app-response';
import { AuthUser } from '../../model/auth/auth-user';
import { Login } from '../../model/auth/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private http: HttpClient
  ) {}

  login(value: Login): Observable<AppResponse<AuthUser>> {
    return this.http
      .post<AppResponse<AuthUser>>(environment.apiUrl + '/api/login/', {
        email: value.email,
        password: value.password,
      })
      .pipe(
        tap((res) => {
          if (res.statusCode === 200 && res.success) {
            this.localStorage.setItem('userId', JSON.stringify(res.data.id));
            this.localStorage.setItem('token', JSON.stringify(res.data.token));
          }
        })
      );
  }
}
