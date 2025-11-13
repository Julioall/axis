import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { SharedModule } from '../../../../shared/shared.module';
import { RegisterComponent, passwordsMustMatchValidator } from './register.component';

// --- Mocks ---
const mockAuthService = {
  register: jest.fn()
};

const mockRouter = {
  navigate: jest.fn()
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        SharedModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges(); // ngOnInit
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o formulário de registro com 3 campos', () => {
    expect(component.registerForm.controls['email']).toBeDefined();
    expect(component.registerForm.controls['password']).toBeDefined();
    expect(component.registerForm.controls['confirmPassword']).toBeDefined();
  });

  it('o formulário deve ser inválido se as senhas não coincidirem', () => {
    component.registerForm.controls['email'].setValue('tutor@test.com');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['confirmPassword'].setValue('654321');
    
    // Força a validação do grupo
    component.registerForm.updateValueAndValidity();
    
    expect(component.registerForm.valid).toBeFalsy();
    expect(component.registerForm.errors?.['passwordsMustMatch']).toBeTruthy();
    expect(component.confirmPassword?.hasError('passwordsMustMatch')).toBeTruthy();
  });

  it('o formulário deve ser válido se todos os campos estiverem corretos', () => {
    component.registerForm.controls['email'].setValue('tutor@test.com');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['confirmPassword'].setValue('123456');
    
    component.registerForm.updateValueAndValidity();

    expect(component.registerForm.valid).toBeTruthy();
    expect(component.registerForm.errors).toBeNull();
  });

  it('deve chamar authService.register() com os dados corretos', async () => {
    mockAuthService.register.mockResolvedValue(undefined);

    component.registerForm.controls['email'].setValue('tutor@test.com');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['confirmPassword'].setValue('123456');
    
    await component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith('tutor@test.com', '123456');
    expect(component.isLoading).toBe(false);
  });
});