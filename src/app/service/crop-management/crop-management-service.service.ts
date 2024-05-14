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
import {
  CropForm,
  Crop,
  PestDisease,
  CropStageForm,
  CropStage,
} from '../../model/crop-management/crop';

@Injectable({
  providedIn: 'root',
})
export class CropManagementServiceService {
  constructor(private httpClient: HttpClient) {}

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

  saveCropStageVideo(
    cropId: number,
    stage: CropStageForm
  ): Observable<AppResponse<CropStage>> {
    const form = new FormData();
    form.append('crop', cropId.toString());
    Object.entries(stage).forEach(([key, value]) => {
      form.append(key, value);
    });
    return this.httpClient.post<AppResponse<CropStage>>(
      `${environment.apiUrl}/api/crops/crop/stages/`,
      form
    );
  }

  saveCropImage(id: number, file: File): Observable<AppResponse<any>> {
    const form = new FormData();
    form.append('image', file);
    return this.httpClient.put<AppResponse<any>>(
      `${environment.apiUrl}/api/crops/crop/${id}/image/`,
      form
    );
  }
}
