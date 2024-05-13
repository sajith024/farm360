import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppResponse } from '../../model/app-response';
import { DashboardStats } from '../../model/dashboard/dashboard-stats';
import { Profile } from '../../model/dashboard/profile';
import { LOCAL_STORAGE } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private httpClient: HttpClient
  ) {}

  getUserProfile(): Observable<AppResponse<Profile>> {
    const userId = this.localStorage.getItem('userId');
    return this.httpClient
      .get<AppResponse<Profile>>(`${environment.apiUrl}/api/users/${userId}/`)
      .pipe(
        tap((res) => {
          if (res.statusCode === 200 && res.success) {
            this.localStorage.setItem('profile', JSON.stringify(res.data));
          }
        })
      );
  }

  getDashboardStats(): Observable<AppResponse<DashboardStats>> {
    return this.httpClient.get<AppResponse<DashboardStats>>(
      `${environment.apiUrl}/api/dashboard/stats/`
    );
  }
}
