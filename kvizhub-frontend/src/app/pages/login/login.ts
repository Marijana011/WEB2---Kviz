import { Component, inject, Inject } from '@angular/core';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  api = inject(ApiService);

  username = '';
  password = '';

  login() {
    this.api.login({
      username: this.username,
      password: this.password
    }).subscribe(res => {
      console.log(res);
    });
  }
}
