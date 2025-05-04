import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  senha: string = '';

  erro: string = '';
  sucesso: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.erro = '';
    if (!this.username || !this.senha) {
      this.erro = 'Todos os campos são obrigatórios.';
      return;
    }

    const loginData = {
      username: this.username,
      senha: this.senha
    }

    this.authService.login(loginData).subscribe({
      next: () => { console.log("Usuário autenticado") },
      error: (err) => { this.erro = err.error.mensagem }
    })
  }

}

