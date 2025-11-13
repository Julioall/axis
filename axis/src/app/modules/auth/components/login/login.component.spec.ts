import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router }.
import { AuthService } from '../../../../core/auth/auth.service';
import { SharedModule } from '../../../../shared/shared.module';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';

// --- Mocks ---
const mockAuthService = {
  login: jest.fn()
};

const mockRouter = {
  navigate: jest.fn()
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule, // Desabilita animações para testes
        SharedModule // Importa o SharedModule para os componentes do Material
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges(); // Dispara o ngOnInit
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o formulário de login com campos de e-mail e senha', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('o campo de e-mail deve ser inválido se não for um e-mail', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('texto-invalido');
    expect(email.valid).toBeFalsy();
    expect(email.errors?.['email']).toBeTruthy();
  });

  it('o formulário deve ser inválido quando os campos estão vazios', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('NÃO deve chamar authService.login() se o formulário for inválido', async () => {
    await component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('deve chamar authService.login() com os dados corretos quando o formulário for válido', async () => {
    // Define o retorno do mock
    mockAuthService.login.mockResolvedValue(undefined); 

    // Preenche o formulário
    component.loginForm.controls['email'].setValue('tutor@test.com');
    component.loginForm.controls['password'].setValue('123456');
    
    await component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('tutor@test.com', '123456');
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBeNull();
  });

  it('deve definir isLoading como true durante a chamada e false depois', async () => {
    mockAuthService.login.mockResolvedValue(undefined);
    component.loginForm.controls['email'].setValue('tutor@test.com');
    component.loginForm.controls['password'].setValue('123456');

    const promise = component.onSubmit(); // Inicia a submissão
    expect(component.isLoading).toBe(true); // Verifica o estado durante
    await promise; // Espera terminar
    expect(component.isLoading).toBe(false); // Verifica o estado depois
  });

  it('deve definir errorMessage em caso de falha no login', async () => {
    const error = { code: 'auth/user-not-found' };
    mockAuthService.login.mockRejectedValue(error);
    
    component.loginForm.controls['email'].setValue('tutor@test.com');
    component.loginForm.controls['password'].setValue('123456');
    
    await component.onSubmit();

    expect(authService.login).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('E-mail ou senha inválidos.');
  });
});