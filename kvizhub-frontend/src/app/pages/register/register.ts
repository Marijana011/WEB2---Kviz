import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  api = inject(ApiService);
  router = inject(Router);

  username = '';

  goToLogin() {
        this.router.navigate(['/login']);
  }

  password = '';
  confirmPassword = '';
  email = '';
  imageUri = '';

  usernameError = '';
  emailError = '';
  passwordError = '';
  generalError = '';

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  

  onFileSelected(event: any){
    const file = event.target.files[0];

    if(file)
    {
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  register() {
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.generalError = '';

    if (!this.username.trim()) {
      this.usernameError = 'Enter username';
      return;
      }

    if (this.password.length < 8) {
      this.passwordError = 'Password must have at least 8 characters';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match';
      return;
    }

    if (!this.email.includes('@')) {
      this.emailError = 'Enter valid email';
      return;
    }

   this.api.register({
    username: this.username,
    email: this.email,
    password: this.password,
    imageUri: this.imagePreview
    }).subscribe({
      next: () => {
        alert('Registration successful');   
        this.router.navigate(['/login']);   
    },
    error: (err: any) => {
      if(err.error.includes('Username')){
        this.usernameError = err.error;
      }else if(err.error.includes('Email')){
        this.emailError = err.error;
      }else{
        this.generalError = err.error;
      }

    }
  });
}

}
