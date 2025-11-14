import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';

/**
 * Componente para a tela de Login do Tutor/Usuário.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: SHARED_IMPORTS
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  hidePassword = true;
  isDarkTheme = false;

  @HostBinding('class.dark-theme')
  get darkThemeClass(): boolean {
    return this.isDarkTheme;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Constrói o formulário reativo de login.
   */
  private buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Manipula a submissão do formulário de login.
   * Chama o AuthService para autenticar.
   */
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      // A navegação é tratada pelo AuthService
    } catch (error: any) {
      // Exibe mensagens de erro amigáveis (exemplo)
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        this.errorMessage = 'E-mail ou senha inválidos.';
      } else {
        this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  // Getters para acesso fácil no template
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}

