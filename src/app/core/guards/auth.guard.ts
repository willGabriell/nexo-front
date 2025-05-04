import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("entrou");

  if (authService.isAuthenticated()) {
    console.log(authService.isAuthenticated());
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
