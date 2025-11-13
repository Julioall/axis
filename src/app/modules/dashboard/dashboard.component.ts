import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, AsyncPipe]
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser;
  }

  ngOnInit(): void {
    console.log('Dashboard carregado');
  }

  // Método para obter o usuário atual
  get currentUser(): any {
    return this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
  }
}

