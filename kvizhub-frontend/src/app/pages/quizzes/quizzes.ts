import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.css',
  
})
export class Quizzes implements OnInit{
  api = inject(ApiService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  quizzes: any[] = [];

  username = '';
  imageUri = '';
  role = '';
  email = '';

  ngOnInit() { 
      this.username = localStorage.getItem('username') || '';
      this.imageUri = localStorage.getItem('imageUri') || '';
      this.role = localStorage.getItem('role') || '';
      this.email = localStorage.getItem('email') || '';

      this.api.getQuizzes().subscribe((res:any) => {
        this.quizzes = res || [];
        this.cdr.detectChanges();
      });     
  }

  goToCreateQuiz(){
    this.router.navigate(['/create-quiz']);
  }

  openQuiz(id: number){
    this.router.navigate(['/quiz-details', id]);
  }
}
