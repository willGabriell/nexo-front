import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly url: string = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  cadastrar(data: novaCategoria): Observable<any[]> {
    return this.http.post<any[]>(this.url, data);
  }
}

interface novaCategoria {
  nome: string;
}
