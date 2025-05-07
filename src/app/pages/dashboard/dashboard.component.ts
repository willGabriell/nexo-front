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
  novaCategoria = {
    nome: ''
  };

  constructor (private categoriasService: CategoriasService, private router: Router) {}

  ngOnInit(): void {
      this.categoriasService.listar().subscribe({
        next: (res) => this.categorias = res,
        error: (err) => console.error('Erro ao carregar categorias', err)
      })
  }

  verCategoria(id: number) {
    console.log(id);
  }

  sucessoCadastro() {
    this.modal = false;
    this.novaCategoria.nome = '';
    this.categoriasService.listar().subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('Erro ao atualizar categorias', err)
    });
  }

  cadastrarCategoria() {
    this.categoriasService.cadastrar(this.novaCategoria).subscribe({
      next: () => this.sucessoCadastro(),
      error: (err) => console.log(err)
    })
  }
}