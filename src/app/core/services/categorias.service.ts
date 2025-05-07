import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly url: string = 'http://localhost:8080/categorias';

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
