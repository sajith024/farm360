import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  AppHttpParams,
  AppPaginatedResponse,
  AppResponse,
} from '../../model/app-response';
import {
  CommunityCommentDetail,
  CommunityQuery,
  CommunityQueryDetail,
} from '../../model/community-management/community-query';

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

  getQuery(
    queryId: number | string
  ): Observable<AppResponse<CommunityQueryDetail>> {
    return this.httpClient.get<AppResponse<CommunityQueryDetail>>(
      `${environment.apiUrl}/api/community/queries/${queryId}/`
    );
  }

  getComments(
    queryId: number | string
  ): Observable<AppResponse<CommunityCommentDetail[]>> {
    const httpParams = new HttpParams().append('query', queryId);
    return this.httpClient.get<AppResponse<CommunityCommentDetail[]>>(
      `${environment.apiUrl}/api/community/comments/`,
      {
        params: httpParams,
      }
    );
  }

  createComment(
    comment: CommunityQuery
  ): Observable<AppResponse<CommunityQuery>> {
    return this.httpClient.post<AppResponse<CommunityQuery>>(
      `${environment.apiUrl}/api/community/comment/`,
      comment
    );
  }

  deleteQuery(queryId: number | string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/api/community/query/${queryId}/`
    );
  }

  deleteComment(commentId: number | string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/api/community/comment/${commentId}/`
    );
  }
}
