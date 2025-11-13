import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../auth/auth.service';

/**
 * Interceptor HTTP standalone para tratamento centralizado de erros.
 * Intercepta erros HTTP e trata-os de forma consistente em toda a aplicação.
 */
export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro. Tente novamente.';

      if (error.error instanceof ErrorEvent) {
        // Erro do lado do cliente
        errorMessage = `Erro: ${error.error.message}`;
        console.error('Erro do Cliente:', error.error);
      } else {
        // Erro do lado do servidor
        switch (error.status) {
          case 0:
            errorMessage = 'Erro de conexão. Verifique sua internet.';
            break;
          case 400:
            errorMessage = error.error?.message || 'Requisição inválida.';
            break;
          case 401:
            errorMessage = 'Sessão expirada. Faça login novamente.';
            authService.logout();
            router.navigate(['/auth/login']);
            break;
          case 403:
            errorMessage = 'Acesso negado.';
            break;
          case 404:
            errorMessage = 'Recurso não encontrado.';
            break;
          case 409:
            errorMessage = error.error?.message || 'Conflito nos dados.';
            break;
          case 422:
            // Erro de validação
            if (error.error?.errors) {
              errorMessage = Object.values(error.error.errors).join(', ');
            } else {
              errorMessage = 'Dados inválidos. Verifique os campos.';
            }
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Tente novamente.';
            break;
          case 503:
            errorMessage = 'Servidor indisponível. Tente mais tarde.';
            break;
          default:
            errorMessage = `Erro ${error.status}: ${error.statusText}`;
        }

        console.error('Erro do Servidor:', {
          status: error.status,
          message: error.statusText,
          url: error.url
        });
      }

      // Exibe a notificação de erro
      notificationService.error(errorMessage);

      return throwError(() => error);
    })
  );
};

/**
 * Classe NgModule-based (mantida por retrocompatibilidade)
 */
@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro. Tente novamente.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
          console.error('Erro do Cliente:', error.error);
        } else {
          switch (error.status) {
            case 0:
              errorMessage = 'Erro de conexão. Verifique sua internet.';
              break;
            case 400:
              errorMessage = error.error?.message || 'Requisição inválida.';
              break;
            case 401:
              errorMessage = 'Sessão expirada. Faça login novamente.';
              this.authService.logout();
              this.router.navigate(['/auth/login']);
              break;
            case 403:
              errorMessage = 'Acesso negado.';
              break;
            case 404:
              errorMessage = 'Recurso não encontrado.';
              break;
            case 409:
              errorMessage = error.error?.message || 'Conflito nos dados.';
              break;
            case 422:
              if (error.error?.errors) {
                errorMessage = Object.values(error.error.errors).join(', ');
              } else {
                errorMessage = 'Dados inválidos. Verifique os campos.';
              }
              break;
            case 500:
              errorMessage = 'Erro interno do servidor. Tente novamente.';
              break;
            case 503:
              errorMessage = 'Servidor indisponível. Tente mais tarde.';
              break;
            default:
              errorMessage = `Erro ${error.status}: ${error.statusText}`;
          }

          console.error('Erro do Servidor:', {
            status: error.status,
            message: error.statusText,
            url: error.url
          });
        }

        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
