import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ApiService } from '../../services/api';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-quiz.html',
  styleUrl: './create-quiz.css',
})
export class CreateQuiz {

  api = inject(ApiService);
  router = inject(Router);

  title = '';
  description = '';
  difficulty = '';

  questions = [
    {
      text: '',
      type: 'Single',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: ''
    }
  ];

  addQuestion() {
    this.questions.push({
      text: '',
      type: 'Single',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: ''
    });
  }

  createQuiz() {
    this.api.createQuiz({
      title: this.title,
      description: this.description,
      difficulty: this.difficulty,
      questions: this.questions
    }).subscribe({
      next: (res) => {
        console.log(res);
        alert('Quiz create successfully');
        this.router.navigate(['/quizzes']);
      },
      error: (err) => {
        console.log(err);
        alert('Error created quiz');
      }
    });
  }
}