import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login {

  api = inject(ApiService);
  router = inject(Router);

  errorMessage = '';

  username = '';
  password = '';
  

  login() {
    this.api.login({
      username: this.username,
      password: this.password
    }).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.result);
      localStorage.setItem('username', this.username);
      localStorage.setItem('imageUri', res.imageUri || '');
      localStorage.setItem('role', res.role);
      localStorage.setItem('email', res.email || '');
      this.router.navigate(['/quizzes']);
    },
    error: () => {
      this.errorMessage = 'Wrong username or password';
    }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
