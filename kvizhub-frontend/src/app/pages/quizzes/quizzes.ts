import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.css',
})
export class Quizzes implements OnInit{
  api = inject(ApiService);

  quizzes: any[] = [];

  username = '';
  imageUri = '';


  ngOnInit() {
    this.api.getQuizzes().subscribe((res: any) => {
      this.username = localStorage.getItem('username') || '';
      this.imageUri = localStorage.getItem('imageUri') || '';
      console.log(res);
      
      this.quizzes = res;
    });
  }
}
