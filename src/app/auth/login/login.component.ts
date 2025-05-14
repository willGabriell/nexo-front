import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/services/message.service';

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

  botaoLabel: string = 'Entrar'
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');

    this.messageService.currentMessage.subscribe(message => {
      if (message) {
        this.erro = message;
        this.messageService.clearMessage();
        setTimeout(() => {
          this.erro = ''
        }, 3000)
      }
    });
  }

  login() {
    this.erro = '';
    if (!this.username || !this.senha) {
      this.erro = 'Todos os campos são obrigatórios.';
      setTimeout(() => {
        this.erro = ''
      }, 3000)
      return;
    }

    const loginData = {
      username: this.username,
      senha: this.senha
    }

    this.botaoLabel = 'Entrando...';
    this.isLoading = true;

    this.authService.login(loginData).subscribe({
      next: () => { 
        this.isLoading = false;
        this.router.navigate(['dashboard']) 
      },
      error: (err) => { 
        this.erro = err.error.mensagem;
        this.isLoading = false;
        this.botaoLabel = 'Entrar';
      }
    })
  }

}

