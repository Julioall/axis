import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Auth, UserCredential } from '@angular/fire/auth';
import * as angularFireAuth from '@angular/fire/auth';
import { AuthService } from './auth.service';

// --- Mocks ---
const mockAuth = {
  currentUser: null
} as unknown as Auth;

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('AuthService', () => {
  let service: AuthService;
  let auth: Auth;
  let router: Router;
  let signInSpy: jasmine.Spy;
  let createUserSpy: jasmine.Spy;
  let signOutSpy: jasmine.Spy;

  beforeEach(() => {
    spyOn(angularFireAuth, 'authState').and.returnValue(of(null));
    signInSpy = spyOn(angularFireAuth, 'signInWithEmailAndPassword');
    createUserSpy = spyOn(angularFireAuth, 'createUserWithEmailAndPassword');
    signOutSpy = spyOn(angularFireAuth, 'signOut');

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: mockAuth },
        { provide: Router, useValue: mockRouter }
      ]
    });
    service = TestBed.inject(AuthService);
    auth = TestBed.inject(Auth);
    router = TestBed.inject(Router);

    mockRouter.navigate.calls.reset();
    signInSpy.calls.reset();
    createUserSpy.calls.reset();
    signOutSpy.calls.reset();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('Login', () => {
    it('deve chamar signInWithEmailAndPassword e navegar para /dashboard em caso de sucesso', async () => {
      const credential = { user: {} } as UserCredential;
      signInSpy.and.returnValue(Promise.resolve(credential));

      await service.login('test@test.com', 'password123');

      expect(signInSpy).toHaveBeenCalledWith(auth, 'test@test.com', 'password123');
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('deve lançar um erro em caso de falha no login', async () => {
      const error = new Error('Login failed');
      signInSpy.and.returnValue(Promise.reject(error));

      await expectAsync(service.login('wrong@test.com', 'wrong'))
        .toBeRejectedWith(error);

      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Register', () => {
    it('deve chamar createUserWithEmailAndPassword e navegar para /dashboard em caso de sucesso', async () => {
      const credential = { user: {} } as UserCredential;
      createUserSpy.and.returnValue(Promise.resolve(credential));

      await service.register('new@test.com', 'password123');

      expect(createUserSpy).toHaveBeenCalledWith(auth, 'new@test.com', 'password123');
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe('Logout', () => {
    it('deve chamar signOut e navegar para /auth/login', async () => {
      signOutSpy.and.returnValue(Promise.resolve());

      await service.logout();

      expect(signOutSpy).toHaveBeenCalledWith(auth);
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  });
});
