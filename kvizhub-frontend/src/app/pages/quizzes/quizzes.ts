import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  searchTerm = '';
  selectedCategory = '';
  selectedDifficulty = '';

  filteredQuizzes: any[] = [];
  categories = [
  'Programming',
  'History',
  'Science',
  'Math',
  'Geography'
  ];

  ngOnInit() { 
    if(typeof window !== 'undefined'){
      this.username = localStorage.getItem('username') || '';
      this.imageUri = localStorage.getItem('imageUri') || '';
      this.role = localStorage.getItem('role') || '';
      this.email = localStorage.getItem('email') || '';
    }
      this.api.getQuizzes().subscribe((res:any) => {
        this.quizzes = res || [];
        this.filteredQuizzes = this.quizzes;

        this.categories = [...new Set(
          this.quizzes
          .map(q => q.category)
          .filter(c => c && c.trim() !== ''))];
        this.cdr.detectChanges();
      });     
  }

  goToCreateQuiz(){
    this.router.navigate(['/create-quiz']);
  }

  openQuiz(id: number){
    this.router.navigate(['/quiz-details', id]);
  }

  applyFilters(){
    this.filteredQuizzes = this.quizzes.filter(q => {

    const term = this.searchTerm.toLowerCase().split(' ');
    const matchesSearch = term.every(t =>
    q.title?.toLowerCase().includes(t) ||
    q.description?.toLowerCase().includes(t) ||
    q.category?.toLowerCase().includes(t));

    const matchesCategory = this.selectedCategory
      ? q.category === this.selectedCategory
      : true;

    const matchesDifficulty = this.selectedDifficulty
      ? q.difficulty === this.selectedDifficulty
      : true;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });
}

}
