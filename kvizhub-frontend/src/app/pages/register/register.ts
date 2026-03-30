import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  api = inject(ApiService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

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
  imageError = '';

  selectedFile: File | null = null;
  imagePreview = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  

  onFileSelected(event: any){
    const file = event.target.files[0];

    if(file)
    {     
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }


  register() {
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.generalError = '';
    this.imageError = '';

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

    if(!this.imagePreview){
      this.imageError = 'Please choose profile image';
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
