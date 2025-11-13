import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';

/**
 * Validador customizado para verificar se as senhas coincidem.
 */
export function passwordsMustMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password?.value !== confirmPassword?.value) {
    // Define o erro no campo 'confirmPassword'
    confirmPassword?.setErrors({ passwordsMustMatch: true });
    return { passwordsMustMatch: true };
  } else {
    // Se coincidem, remove o erro (caso exista)
    if (confirmPassword?.hasError('passwordsMustMatch')) {
      confirmPassword.setErrors(null);
    }
    return null;
  }
}

/**
 * Componente para a tela de Cadastro do Tutor/Usuário.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: SHARED_IMPORTS
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: passwordsMustMatchValidator // Aplica o validador no grupo
    });
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      const { email, password } = this.registerForm.value;
      await this.authService.register(email, password);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Este e-mail já está em uso.';
      } else {
        this.errorMessage = 'Ocorreu um erro ao criar a conta.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  // Getters para o template
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}

