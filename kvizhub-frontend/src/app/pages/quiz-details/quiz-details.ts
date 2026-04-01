import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-details.html',
  styleUrl: './quiz-details.css',
})
export class QuizDetails implements OnInit {

  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  cdr = inject(ChangeDetectorRef)

  quiz: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.api.getQuizById(id).subscribe((res: any) => {
      this.quiz = res;

      console.log(this.quiz.questions);

      this.quiz.questions.forEach((q: any) => {
      q.userAnswer = '';
      });

      this.cdr.detectChanges();
    });
  }

  goBack(){
    this.router.navigate(['/quizzes']);
  }
}
