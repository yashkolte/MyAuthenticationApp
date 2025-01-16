// types/auth.ts
export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: string[];
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
}