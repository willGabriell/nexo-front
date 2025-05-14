import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod'

interface LoginPayload {
  username: string;
  senha: string;
}

interface RegistroPayload {
  username: string;
  email: string;
  senha: string;
  role: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) { }

  login(data: LoginPayload): Observable<any> {
    return this.http.post<LoginResponse>(`${this.API}/login`, data)
    .pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem('username', data.username);
        }
      })
    )
  }

  register(data: RegistroPayload): Observable<any> {
    return this.http.post(`${this.API}/register`, data)
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('username')
  }
}
