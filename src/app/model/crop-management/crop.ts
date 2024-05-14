import { Fertilizer, Pesticide, Seed } from './crop-product';

export interface Crop {
  id?: number;
  name: string;
  description: string;
  fertilizers: number[];
  fertilizer_provider: Provider;
  crop_seeds: number[];
  crop_seed_provider: Provider;
  pest_diseases: PestDisease[];
}

export interface CropDetail {
  id?: number;
  name: string;
  image: string | null;
  description: string;
  fertilizers: Fertilizer[];
  fertilizer_provider: Provider;
  crop_seeds: Seed[];
  crop_seed_provider: Provider;
  pest_diseases: PestDiseaseDetail[];
  crop_stages: CropStageDetail[];
}

export interface Provider {
  id?: number;
  name: string;
  phone_number: string;
}

export interface CropStage {
  id?: number;
  stage: string;
  title: string;
  video: File | null;
  description: string;
}

export interface CropStageDetail {
  id?: number;
  stage: string;
  title: string;
  video: string | null;
  description: string;
}

export interface PestDisease {
  id?: number;
  insect_name: string;
  symptoms: string;
  pest_product: number[];
  chemical_control: string;
  biological_control: string;
}

export interface PestDiseaseDetail {
  id?: number;
  insect_name: string;
  symptoms: string;
  pest_product: Pesticide[];
  chemical_control: string;
  biological_control: string;
}

export interface CropForm {
  id?: number;
  name: string;
  description: string;
  image: File | null;
  stages: CropStageForm[];
  fertilizers: Fertilizer[];
  fertilizerProvider: ProviderForm;
  seedProvider: ProviderForm;
  seeds: Seed[];
  pestDiseases: PestDiseasesForm[];
}

export interface ProviderForm {
  id?: number;
  name: string;
  contactNumber: string;
}

export interface CropStageForm {
  id?: number;
  stage: string;
  video: File | null;
  title: string;
  description: string;
}

export interface PestDiseasesForm {
  id?: number;
  insectDetails: string;
  symptoms: string;
  recommendedProducts: Pesticide[];
  chemicalControl: string;
  biologicalControl: string;
}
