import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  username: string = '';
  email: string = '';
  senha: string = '';
  confirmaSenha: string = '';
  role: string = "USER";

  erro: string = '';
  sucesso: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  }

  constructor(private authService: AuthService, private router: Router) { }

  registrar() {
    this.erro = '';
    if (!this.username || !this.email || !this.senha || !this.confirmaSenha) {
      this.erro = 'Todos os campos são obrigatórios.';
      setTimeout(() => {
        this.erro = ''
      }, 3000)
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.erro = 'E-mail inválido.';
      setTimeout(() => {
        this.erro = ''
      }, 3000)
      return;
    }

    if (!this.validarForcaSenha(this.senha)) {
      this.erro = 'A senha precisa conter ao menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um símbolo.';
      setTimeout(() => {
        this.erro = ''
      }, 3000)
      return;
    }

    if (this.senha !== this.confirmaSenha) {
      this.erro = 'As senhas não coincidem.';
      setTimeout(() => {
        this.erro = ''
      }, 3000)
      return;
    }

    const novoUsuario = {
      username: this.username,
      email: this.email,
      senha: this.senha,
      role: this.role
    };

    this.isLoading = true;

    this.authService.register(novoUsuario).subscribe({
      next: () => this.usuarioCadastrado(),
      error: (err) => { 
        this.erro = err.error.messagem;
        this.isLoading = false;
      }
    })
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validarForcaSenha(senha: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(senha);
  }

  usuarioCadastrado() {
    this.username = '';
    this.email = '';
    this.senha = '';
    this.confirmaSenha = '';

    this.sucesso = 'Usuário cadastrado com sucesso! <br> Você será redirecionado para a tela de login.';
    this.isLoading = false;

    setTimeout(() => {
      this.sucesso = '';
      this.router.navigate(['/login'])
    }, 3000);

  }

}
