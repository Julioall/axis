import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

/**
 * Guard standalone para proteger rotas autenticadas.
 * Permite a ativação da rota apenas se o Tutor/Usuário estiver autenticado.
 */
export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authState$.pipe(
    take(1),
    map(user => {
      if (user) {
        // Usuário autenticado, permite o acesso
        return true;
      }

      // Usuário não autenticado, redireciona para a tela de login
      console.warn('AuthGuard: Acesso bloqueado. Redirecionando para /auth/login');
      return router.createUrlTree(['/auth/login']);
    })
  );
};

