import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule],
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
      this.cdr.detectChanges();
    });
  }

  goBack(){
    this.router.navigate(['/quizzes']);
  }
}
