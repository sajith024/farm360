import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AppResponse } from '../../model/app-response';
import {
  Fertilizer,
  Pesticide,
  Seed,
} from '../../model/crop-management/crop-product';

@Injectable({
  providedIn: 'root',
})
export class CropManagementServiceService {
  constructor(private httpClient: HttpClient) {}

  getFertilizers(): Observable<AppResponse<Fertilizer[]>> {
    return this.httpClient.get<AppResponse<Fertilizer[]>>(
      `${environment.apiUrl}/api/crop/fertilizers/`
    );
  }

  getSeeds(): Observable<AppResponse<Seed[]>> {
    return this.httpClient.get<AppResponse<Seed[]>>(
      `${environment.apiUrl}/api/crop/seeds/`
    );
  }

  getPesticides(): Observable<AppResponse<Pesticide[]>> {
    return this.httpClient.get<AppResponse<Pesticide[]>>(
      `${environment.apiUrl}/api/crop/pesticide/`
    );
  }
}
