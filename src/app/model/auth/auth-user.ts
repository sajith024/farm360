export interface AuthUser {
  id: string;
  first_name: string;
  last_name: string;
  token: AuthToken;
}

export interface AuthToken {
  refresh: string;
  access: string;
}
