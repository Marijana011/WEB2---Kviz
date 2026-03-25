import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  api = inject(ApiService);
  router = inject(Router);

  username = '';
  password = '';
  confirmPassword = '';
  email = '';
  imageUri = '';

  register() {
    if(!this.email.includes('@')){
      alert('Enter valid email');
      return;   
    }

    if(this.password.length < 8){
      alert('Password must have at least 8 characters');
      return;
    }

    if (this.password !== this.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  this.api.register({
    username: this.username,
    email: this.email,
    password: this.password,
    imageUri: this.imageUri
  }).subscribe(() => {
    this.router.navigate(['/login']);
  });
  }

}
