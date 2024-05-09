import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Profile } from '../../model/dashboard/profile';
import { AppPaginatedResponse } from '../../model/paginated-response';
import { AppResponse } from '../../model/app-response';
import { Language } from '../../model/user-managment/language';
import { Country } from '../../model/user-managment/country';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<AppPaginatedResponse<Profile>> {
    return this.httpClient.get<AppPaginatedResponse<Profile>>(
      `${environment.apiUrl}/api/users/`
    );
  }

  getLanguages(): Observable<AppResponse<Language[]>> {
    return this.httpClient.get<AppResponse<Language[]>>(
      `${environment.apiUrl}/api/languages/`
    );
  }

  getCountries(): Observable<AppResponse<Country[]>> {
    return this.httpClient.get<AppResponse<Country[]>>(
      `${environment.apiUrl}/api/countries/`
    );
  }
}
