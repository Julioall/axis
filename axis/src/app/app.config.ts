import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

/**
 * Configuração da aplicação standalone.
 * Define providers globais, rotas, interceptors e animações.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpInterceptor, errorInterceptor])
    ),
    provideAnimations(),
    provideClientHydration(withEventReplay())
  ]
};


