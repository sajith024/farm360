import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AppHttpParams, AppResponse } from '../../model/app-response';
import {
  Crop,
  CropDetail,
  CropForm,
  CropStage,
  CropStageForm,
  PestDisease,
} from '../../model/crop-management/crop';
import { CropInfo } from '../../model/crop-management/crop-info';
import {
  Fertilizer,
  Pesticide,
  Seed,
} from '../../model/crop-management/crop-product';
import { AppPaginatedResponse } from '../../model/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class CropManagementServiceService {
  constructor(private httpClient: HttpClient) {}

  getCrops(
    paramValue: AppHttpParams
  ): Observable<AppPaginatedResponse<CropInfo>> {
    let params = new HttpParams();
    params = paramValue.search
      ? params.append('search', paramValue.search)
      : params;
    params = paramValue.sort
      ? params.append('ordering', paramValue.sort)
      : params;
    return this.httpClient.get<AppPaginatedResponse<CropInfo>>(
      `${environment.apiUrl}/api/crops/`,
      {
        params: params,
      }
    );
  }

  getCrop(id: number): Observable<AppResponse<CropDetail>> {
    return this.httpClient.get<AppResponse<CropDetail>>(
      `${environment.apiUrl}/api/crops/crop/detail/${id}`
    );
  }

  deleteCrop(id: number): Observable<AppResponse<any>> {
    return this.httpClient.delete<AppResponse<any>>(
      `${environment.apiUrl}/api/crops/crop/${id}/`
    );
  }

  getFertilizers(): Observable<AppResponse<Fertilizer[]>> {
    return this.httpClient.get<AppResponse<Fertilizer[]>>(
      `${environment.apiUrl}/api/crops/fertilizers/`
    );
  }

  getSeeds(): Observable<AppResponse<Seed[]>> {
    return this.httpClient.get<AppResponse<Seed[]>>(
      `${environment.apiUrl}/api/crops/seeds/`
    );
  }

  getPesticides(): Observable<AppResponse<Pesticide[]>> {
    return this.httpClient.get<AppResponse<Pesticide[]>>(
      `${environment.apiUrl}/api/crops/pesticide/`
    );
  }

  createCrop(value: CropForm): Observable<AppResponse<Crop>> {
    const fertilizers = value.fertilizers.map((value) => value.id);
    const crop_seeds = value.seeds.map((value) => value.id);
    const pest_diseases: PestDisease[] = [];
    for (const pest_disease of value.pestDiseases) {
      const product = pest_disease.recommendedProducts.map((value) => value.id);
      pest_diseases.push({
        insect_name: pest_disease.insectDetails,
        symptoms: pest_disease.symptoms,
        pest_product: product,
        chemical_control: pest_disease.chemicalControl,
        biological_control: pest_disease.biologicalControl,
      });
    }

    const body: Crop = {
      name: value.name,
      description: value.description,
      fertilizers: fertilizers,
      fertilizer_provider: {
        name: value.fertilizerProvider.name,
        phone_number: value.fertilizerProvider.contactNumber,
      },
      crop_seeds: crop_seeds,
      crop_seed_provider: {
        name: value.seedProvider.name,
        phone_number: value.seedProvider.contactNumber,
      },
      pest_diseases: pest_diseases,
    };
    return this.httpClient.post<AppResponse<Crop>>(
      `${environment.apiUrl}/api/crops/crop/`,
      body
    );
  }

  updateCrop(id: string, value: CropForm): Observable<AppResponse<Crop>> {
    const fertilizers = value.fertilizers.map((value) => value.id);
    const crop_seeds = value.seeds.map((value) => value.id);
    const pest_diseases: PestDisease[] = [];
    for (const pest_disease of value.pestDiseases) {
      const product = pest_disease.recommendedProducts.map((value) => value.id);
      pest_diseases.push({
        insect_name: pest_disease.insectDetails,
        symptoms: pest_disease.symptoms,
        pest_product: product,
        chemical_control: pest_disease.chemicalControl,
        biological_control: pest_disease.biologicalControl,
      });
    }

    const body: Crop = {
      name: value.name,
      description: value.description,
      fertilizers: fertilizers,
      fertilizer_provider: {
        name: value.fertilizerProvider.name,
        phone_number: value.fertilizerProvider.contactNumber,
      },
      crop_seeds: crop_seeds,
      crop_seed_provider: {
        name: value.seedProvider.name,
        phone_number: value.seedProvider.contactNumber,
      },
      pest_diseases: pest_diseases,
    };
    return this.httpClient.patch<AppResponse<Crop>>(
      `${environment.apiUrl}/api/crops/crop/${id}/`,
      body
    );
  }

  createCropStage(
    cropId: number,
    stage: CropStageForm
  ): Observable<AppResponse<CropStage>> {
    const form = new FormData();
    form.append('crop', cropId.toString());
    Object.entries(stage).forEach(([key, value]) => {
      form.append(key, value ?? '');
    });
    return this.httpClient.post<AppResponse<CropStage>>(
      `${environment.apiUrl}/api/crops/crop/stages/`,
      form
    );
  }

  updateCropStage(
    id: number,
    cropId: number,
    stage: CropStageForm
  ): Observable<AppResponse<CropStage>> {
    const form = new FormData();
    form.append('crop', cropId.toString());
    Object.entries(stage).forEach(([key, value]) => {
      if ((key === 'video' && value !== null) || key !== 'video') {
        form.append(key, value);
      }
    });
    return this.httpClient.patch<AppResponse<CropStage>>(
      `${environment.apiUrl}/api/crops/crop/stages/${id}/`,
      form
    );
  }

  updateCropImage(id: number, file: File): Observable<AppResponse<any>> {
    const form = new FormData();
    form.append('image', file);
    return this.httpClient.put<AppResponse<any>>(
      `${environment.apiUrl}/api/crops/crop/${id}/image/`,
      form
    );
  }
}
