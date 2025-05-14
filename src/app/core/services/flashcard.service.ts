import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private readonly url = `${environment.apiUrl}/flashcards`;

  constructor(private http: HttpClient) {}

  listarPorCategoria(categoriaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${categoriaId}`);
  }

  cadastrar(flashcard: NovoFlashcard): Observable<any> {
    return this.http.post<any>(this.url, flashcard);
  }
}

export interface NovoFlashcard {
  frente: string;
  verso: string;
  idCategoria: number;
}
