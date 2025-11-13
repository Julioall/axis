import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { authGuard } from './auth.guard';
import { AuthService } from '../auth/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('authGuard (CanActivateFn)', () => {
  let mockAuthService: any;
  let mockRouter: any;
  let authStateSubject: BehaviorSubject<any>;

  beforeEach(() => {
    authStateSubject = new BehaviorSubject<any>(null);
    mockAuthService = {
      get authState$() {
        return authStateSubject.asObservable();
      }
    };

    mockRouter = {
      createUrlTree: jasmine.createSpy('createUrlTree').and.callFake(() => {
        return new UrlTree();
      })
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('deve retornar "true" se o usuário estiver autenticado', (done) => {
    authStateSubject.next({ uid: '123', email: 'test@example.com' });

    TestBed.runInInjectionContext(() => {
      const result = authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      if (result instanceof Observable) {
        result.subscribe((guardResult: any) => {
          expect(guardResult).toBe(true);
          expect(mockRouter.createUrlTree).not.toHaveBeenCalled();
          done();
        });
      } else {
        expect(result).toBe(true);
        done();
      }
    });
  });

  it('deve redirecionar para /auth/login se o usuário estiver desautenticado', (done) => {
    authStateSubject.next(null);

    TestBed.runInInjectionContext(() => {
      const result = authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      if (result instanceof Observable) {
        result.subscribe((guardResult: any) => {
          expect(guardResult).toBeInstanceOf(UrlTree);
          expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/auth/login']);
          done();
        });
      } else {
        expect(result).toBeInstanceOf(UrlTree);
        done();
      }
    });
  });

  it('deve bloquear acesso a rota protegida quando usuário não está autenticado', (done) => {
    authStateSubject.next(null);

    TestBed.runInInjectionContext(() => {
      const result = authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      if (result instanceof Observable) {
        result.subscribe((guardResult: any) => {
          expect(guardResult).not.toBe(true);
          expect(guardResult).toBeInstanceOf(UrlTree);
          done();
        });
      } else {
        expect(result).not.toBe(true);
        done();
      }
    });
  });

  it('deve permitir acesso com usuário autenticado com múltiplos acionamentos', (done) => {
    authStateSubject.next({ uid: '456', email: 'user@example.com' });

    TestBed.runInInjectionContext(() => {
      const result = authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      if (result instanceof Observable) {
        result.subscribe((guardResult: any) => {
          expect(guardResult).toBe(true);
          expect(mockRouter.createUrlTree).not.toHaveBeenCalled();
          done();
        });
      } else {
        expect(result).toBe(true);
        done();
      }
    });
  });
});
