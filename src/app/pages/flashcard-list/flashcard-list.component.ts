import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashcardService, NovoFlashcard } from '../../core/services/flashcard.service';
import { CategoriasService } from '../../core/services/categorias.service';

@Component({
  selector: 'app-flashcard-list',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './flashcard-list.component.html',
  styleUrl: './flashcard-list.component.css'
})
export class FlashcardListComponent implements OnInit {
  modal: boolean = false;
  flashcards: any[] = [];
  novaPergunta: string = '';
  novaResposta: string = '';
  novaFrente: string = '';
  novoVerso: string = '';
  idCategoria!: number;
  erro: string = '';
  carregando: boolean = true;
  modalFlashcard: boolean = false;
  flashcardSelecionado: any = null;
  mostrarVerso: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private flashcardService: FlashcardService, private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('categoriaId');
      if (id) {
        this.idCategoria = +id;
        this.validarCategoriaUsuario();
      }
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    if (this.modalFlashcard) {
      this.fecharModalFlashcard();
    }
  }

  validarCategoriaUsuario() {
    this.categoriasService.listar().subscribe({
      next: (categorias) => {
        const existe = categorias.some((cat: any) => cat.id === this.idCategoria);
        if (!existe) {
          this.router.navigate(['/dashboard']);
        } else {
          this.listarFlashcards();
        }
      },
      error: () => {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  listarFlashcards() {
    this.carregando = true;
    this.flashcardService.listarPorCategoria(this.idCategoria).subscribe({
      next: (res) => {
        this.flashcards = res.map(card => ({ ...card, flipped: false }));
        this.carregando = false;
      },
      error: () => {
        this.flashcards = [];
        this.carregando = false;
      }
    });
  }

  flipCard(index: number) {
    this.flashcards[index].flipped = !this.flashcards[index].flipped;
  }

  abrirModalFlashcard(card: any) {
    this.flashcardSelecionado = card;
    this.mostrarVerso = false;
    this.modalFlashcard = true;
  }

  fecharModalFlashcard() {
    this.modalFlashcard = false;
    this.flashcardSelecionado = null;
    this.mostrarVerso = false;
  }

  revelarVerso() {
    this.mostrarVerso = true;
  }

  flipCardModal() {
    this.mostrarVerso = !this.mostrarVerso;
  }

  cadastrarFlashcard() {
    this.erro = '';
    if (!this.novaFrente || !this.novoVerso) {
      this.erro = 'Preencha todos os campos.';
      return;
    }
    const novo: NovoFlashcard = {
      frente: this.novaFrente,
      verso: this.novoVerso,
      idCategoria: this.idCategoria
    };
    this.flashcardService.cadastrar(novo).subscribe({
      next: () => {
        this.novaFrente = '';
        this.novoVerso = '';
        this.modal = false;
        this.listarFlashcards();
      },
      error: () => {
        this.erro = 'Erro ao cadastrar flashcard.';
      }
    });
  }
}
