import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  username: string = '';
  senha: string = '';

  erro: string = '';

  ngOnInit(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  }

  constructor(private authService: AuthService, private router: Router) { }

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
      next: () => { this.router.navigate(['dashboard']) },
      error: (err) => { this.erro = err.error.mensagem }
    })
  }

}

