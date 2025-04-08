import { axiosInstance } from './http-client';
import { UserModel } from '../types/models';
class AuthService {
   private readonly TOKEN_KEY = 'auth_token';

   public async getUser(): Promise<UserModel> {
      const response = await axiosInstance.get('/auth/profile');
      return response.data;
   }

   public async login(email: string, password: string) {
      const response = await axiosInstance.post('/auth/login', { email, password });
      this.setToken(response.data.access_token);
      return response.data;
   }

   public async signup(email: string, username: string, password: string) {
      const response = await axiosInstance.post('/auth/signup', { email, username, password });
      return response.data;
   }

   public setToken(token: string): void {
      localStorage.setItem(this.TOKEN_KEY, token);
   }

   public getToken(): string | null {
      return localStorage.getItem(this.TOKEN_KEY);
   }

   public removeToken(): void {
      localStorage.removeItem(this.TOKEN_KEY);
   }

   public isAuthenticated(): boolean {
      return !!this.getToken();
   }

   public logout(): void {
      this.removeToken();
   }
}

export const authService = new AuthService();
