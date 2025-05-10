import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  categorias: any[] = [];
  modal: boolean = false;
  toast: boolean = false;
  erro: string = '';
  novaCategoria = {
    nome: ''
  };

  constructor (private categoriasService: CategoriasService, private router: Router) {}

  ngOnInit(): void {
      this.categoriasService.listar().subscribe({
        next: (res) => this.categorias = res,
        error: (err) => this.tokenExpirado(err)
      })
  }

  tokenExpirado(err: any) {
    this.erro = err.error.error || 'Sessão expirada. Faça login novamente.';
    setTimeout(() => {
      this.router.navigate(['login']);
      this.toast = false;
    }, 2000); // Aguarda 2 segundos antes de redirecionar
  }

  verCategoria(id: number) {
    console.log(id);
  }

  sucessoCadastro() {
    this.modal = false;
    this.toast = true;
    this.novaCategoria.nome = '';
    this.categoriasService.listar().subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('Erro ao atualizar categorias', err)
    });
    setTimeout(() => this.toast = false, 3000)
  }

  cadastrarCategoria() {
    this.erro = '';
    if(!this.novaCategoria.nome) {
      this.erro = "Digite o nome da sua categoria";
      return;
    }

    this.categoriasService.cadastrar(this.novaCategoria).subscribe({
      next: () => this.sucessoCadastro(),
      error: (err) => console.log(err)
    })
  }
}