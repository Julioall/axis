import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

// --- Mocks ---
const mockAfAuth = {
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  authState: of(null) // Mock inicial
};

const mockRouter = {
  navigate: jest.fn()
};

describe('AuthService', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: mockAfAuth },
        { provide: Router, useValue: mockRouter }
      ]
    });
    service = TestBed.inject(AuthService);
    afAuth = TestBed.inject(AngularFireAuth);
    router = TestBed.inject(Router);

    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('Login', () => {
    it('deve chamar signInWithEmailAndPassword e navegar para /dashboard em caso de sucesso', async () => {
      mockAfAuth.signInWithEmailAndPassword.mockResolvedValue({ user: 'test' });
      
      await service.login('test@test.com', 'password123');
      
      expect(afAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@test.com', 'password123');
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('deve lançar um erro em caso de falha no login', async () => {
      const error = new Error('Login failed');
      mockAfAuth.signInWithEmailAndPassword.mockRejectedValue(error);
      
      await expect(service.login('wrong@test.com', 'wrong'))
        .rejects
        .toThrow('Login failed');
      
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Register', () => {
    it('deve chamar createUserWithEmailAndPassword e navegar para /dashboard em caso de sucesso', async () => {
      mockAfAuth.createUserWithEmailAndPassword.mockResolvedValue({ user: 'new_user' });

      await service.register('new@test.com', 'password123');
      
      expect(afAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith('new@test.com', 'password123');
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe('Logout', () => {
    it('deve chamar signOut e navegar para /auth/login', async () => {
      mockAfAuth.signOut.mockResolvedValue(undefined);
      
      await service.logout();
      
      expect(afAuth.signOut).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  });
});