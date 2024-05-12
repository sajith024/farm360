export interface CropProduct {
  id: number;
  name: string;
}

export interface Pesticide extends CropProduct {}

export interface Fertilizer extends CropProduct {}

export interface Seed extends CropProduct {}
