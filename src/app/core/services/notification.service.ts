import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Serviço centralizado para exibir notificações (toasts) usando MatSnackBar.
 * Simplifica a exibição de mensagens de sucesso, erro e informação em toda a aplicação.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    duration: 4000
  };

  /**
   * Exibe uma mensagem de sucesso (cor verde)
   * @param message Mensagem a exibir
   * @param duration Duração em ms (padrão: 4000)
   */
  success(message: string, duration = 4000): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration,
      panelClass: ['snackbar-success']
    });
  }

  /**
   * Exibe uma mensagem de erro (cor vermelha)
   * @param message Mensagem a exibir
   * @param duration Duração em ms (padrão: 5000)
   */
  error(message: string, duration = 5000): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration,
      panelClass: ['snackbar-error']
    });
  }

  /**
   * Exibe uma mensagem de informação (cor azul)
   * @param message Mensagem a exibir
   * @param duration Duração em ms (padrão: 4000)
   */
  info(message: string, duration = 4000): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration,
      panelClass: ['snackbar-info']
    });
  }

  /**
   * Exibe uma mensagem de aviso (cor amarela)
   * @param message Mensagem a exibir
   * @param duration Duração em ms (padrão: 4000)
   */
  warning(message: string, duration = 4000): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration,
      panelClass: ['snackbar-warning']
    });
  }

  /**
   * Exibe uma notificação sem fechar automaticamente
   * @param message Mensagem a exibir
   */
  persistent(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      duration: 0
    });
  }
}
