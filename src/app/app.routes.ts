import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

/**
 * Rotas principais da aplicação (Standalone)
 */
export const routes: Routes = [
  // Rotas de Autenticação (Login/Cadastro) - Carregadas preguiçosamente
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(r => r.authRoutes)
  },

  // Rotas Protegidas (Painel, Turmas, Alunos, etc.)
  // O AuthGuard impede o acesso não autenticado.
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  // Redirecionamento Padrão
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },

  // Rota Curinga (Página 404)
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
