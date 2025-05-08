import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MessageService} from '../services/message.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    messageService.setMessage('Você precisa estar logado para acessar esta página.');
    router.navigate(['login']);
    return false;
  }
};
