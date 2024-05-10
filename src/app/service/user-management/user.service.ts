import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AppResponse } from '../../model/app-response';
import {
  Profile,
  ProfileForm,
  ProfileAdd,
} from '../../model/dashboard/profile';
import { AppPaginatedResponse } from '../../model/paginated-response';
import { Country } from '../../model/user-management/country';
import { Language } from '../../model/user-management/language';
import { PhoneCode } from '../../model/user-management/phone-code';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<AppPaginatedResponse<Profile>> {
    return this.httpClient.get<AppPaginatedResponse<Profile>>(
      `${environment.apiUrl}/api/users/profile`
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

  getPhoneCodes(): Observable<AppResponse<PhoneCode[]>> {
    return this.httpClient.get<AppResponse<PhoneCode[]>>(
      `${environment.apiUrl}/api/phonecodes/`
    );
  }

  getUser(userId: number): Observable<AppResponse<ProfileAdd>> {
    return this.httpClient.get<AppResponse<ProfileAdd>>(
      `${environment.apiUrl}/api/users/${userId}/`
    );
  }

  createUser(value: ProfileForm): Observable<AppResponse<ProfileAdd>> {
    const first_name = value.name.split(' ')[0].trim();
    const last_name = value.name.split(' ')[1].trim();

    const body = new FormData();
    body.append('first_name', first_name);
    body.append('image', value.image);
    body.append('language', value.language);
    body.append('country', value.country);
    body.append('phone_code', value.phoneCode);
    body.append('phone_number', value.phoneNumber);
    body.append('email', value.email);
    body.append('password', value.password);

    if (last_name.length != 0) {
      body.append('last_name', last_name);
    }

    return this.httpClient.post<AppResponse<ProfileAdd>>(
      `${environment.apiUrl}/api/users/`,
      body
    );
  }

  editUser(
    value: ProfileAdd,
    edited: ProfileForm
  ): Observable<AppResponse<ProfileAdd>> {
    const first_name = edited.name.split(' ')[0].trim();
    const last_name = edited.name.split(' ')[1].trim();

    const body = new FormData();
    body.append('first_name', first_name);
    body.append('language', edited.language);
    body.append('country', edited.country);
    body.append('phone_code', edited.phoneCode);
    body.append('phone_number', edited.phoneNumber);
    body.append('email', edited.email);

    if (last_name.length != 0) {
      body.append('last_name', last_name);
    }

    if (edited.image) {
      body.append('image', edited.image);
    }

    if (edited.password) {
      body.append('password', edited.password);
    }

    return this.httpClient.patch<AppResponse<ProfileAdd>>(
      `${environment.apiUrl}/api/users/${value.id}/`,
      body
    );
  }
}
