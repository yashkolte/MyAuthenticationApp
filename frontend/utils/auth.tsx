// utils/auth.ts
import axios, { AxiosResponse } from 'axios';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const authService = {
  async login(username: string, password: string): Promise<User> {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL}/auth/signin`,
      { username, password }
    );
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async register(username: string, email: string, password: string, roles: string[] = ['user']): Promise<AxiosResponse> {
    return axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
      role: roles,
    });
  },

  logout(): void {
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
    }
    return null;
  },
};