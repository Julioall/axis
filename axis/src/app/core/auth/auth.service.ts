import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

/**
 * Serviço responsável por gerenciar todo o fluxo de autenticação
 * (Login, Cadastro, Logout) do Tutor/Usuário com o Firebase.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Um observable que emite o estado do usuário (logado ou não).
   * Fundamental para a aplicação reativa.
   */
  readonly authState$: Observable<User | null>;

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.authState$ = authState(this.auth);
    this.currentUserSubject = new BehaviorSubject<User | null>(this.auth.currentUser ?? null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Sincroniza o usuário atual com o Firebase
    this.authState$.subscribe(user => {
      this.currentUserSubject.next(user);
    });
  }

  /**
   * Retorna o valor atual do usuário (síncrono)
   */
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Autentica um Tutor/Usuário usando e-mail e senha.
   * Redireciona para o painel (dashboard) em caso de sucesso.
   * @param email O e-mail do usuário.
   * @param password A senha do usuário.
   * @returns Promise<void>
   */
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      // Sucesso: Redireciona para o painel principal
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error("Erro no login:", error);
      // Propaga o erro para ser tratado no componente
      throw error;
    }
  }

  /**
   * Registra um novo Tutor/Usuário no Firebase Auth.
   * Redireciona para o painel (dashboard) em caso de sucesso.
   * @param email O e-mail para o novo cadastro.
   * @param password A senha para o novo cadastro.
   * @returns Promise<void>
   */
  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      // Opcional: Salvar dados do Tutor/Usuário no Firestore utilizando o usuário atual
      // ex: const user = this.auth.currentUser;
      // this.firestore.doc(`users/${user?.uid}`).set({ ... });

      // Sucesso: Redireciona para o painel principal
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  }

  /**
   * Desconecta o usuário atual do sistema.
   * Redireciona para a tela de login.
   * @returns Promise<void>
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  }


}
