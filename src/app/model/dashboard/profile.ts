export interface Profile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  phone_number: string;
  role: string;
  language: string;
  country: string;
}

export interface ProfileForm {
  email: string;
  name: string;
  image: File;
  phoneCode: string;
  phoneNumber: string;
  role: string;
  language: string;
  country: string;
  password: string;
}

export interface ProfileAdd {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  phone_code: number;
  phone_number: number;
  role: number;
  language: number;
  country: number;
}
