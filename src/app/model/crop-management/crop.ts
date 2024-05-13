import { Fertilizer, Pesticide, Seed } from './crop-product';

export interface Crop {
  id?: number;
  name: string;
  description: string;
  crop_stages: CropStage[];
  fertilizers: number[];
  fertilizer_provider: Provider;
  crop_seeds: number[];
  crop_seed_provider: Provider;
  pest_diseases: PestDisease[];
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

export interface CropForm {
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
  name: string;
  contactNumber: string;
}

export interface CropStageForm {
  stage: string;
  video: File | null;
  title: string;
  description: string;
}

export interface PestDiseasesForm {
  insectDetails: string;
  symptoms: string;
  recommendedProducts: Pesticide[];
  chemicalControl: string;
  biologicalControl: string;
}
