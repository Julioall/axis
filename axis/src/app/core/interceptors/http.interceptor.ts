import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * Interceptor HTTP standalone para adicionar tokens JWT e headers customizados.
 * Intercepta todas as requisições HTTP e adiciona o token de autenticação, se disponível.
 */
export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  // Obtém o usuário atual
  const currentUser = authService.currentUserValue;

  // Se o usuário está autenticado, clona a requisição e adiciona o token
  if (currentUser) {
    // Nota: Para usar um token JWT real, você precisaria obter o token do usuário
    // currentUser.getIdToken() retorna o token do Firebase
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.uid}`, // Exemplo com UID
        'X-Custom-Header': 'AXIS-Client'
      }
    });
  }

  return next(req);
};

/**
 * Classe NgModule-based (mantida por retrocompatibilidade)
 */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.uid}`,
          'X-Custom-Header': 'AXIS-Client'
        }
      });
    }

    return next.handle(req);
  }
}
