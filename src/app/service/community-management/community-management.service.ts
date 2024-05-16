import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AppHttpParams } from '../../model/app-response';
import { AppPaginatedResponse } from '../../model/paginated-response';
import { CommunityQueryDetail } from '../../model/community-management/community-query';

@Injectable({
  providedIn: 'root',
})
export class CommunityManagementService {
  constructor(private httpClient: HttpClient) {}

  getQueries(
    paramValue: AppHttpParams
  ): Observable<AppPaginatedResponse<CommunityQueryDetail>> {
    let params = new HttpParams();
    params = paramValue.search
      ? params.append('search', paramValue.search)
      : params;
    params = paramValue.sort
      ? params.append('ordering', paramValue.sort)
      : params;
    params = paramValue.page ? params.append('page', paramValue.page) : params;
    return this.httpClient.get<AppPaginatedResponse<CommunityQueryDetail>>(
      `${environment.apiUrl}/api/community/queries/`,
      {
        params: params,
      }
    );
  }
}
