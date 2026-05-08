import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';

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
  cdr = inject(ChangeDetectorRef);

  quiz: any;

  timeLeft = 0;
  
  interval: any;

  Math = Math

  resultDetails: any[] = [];
  score = 0;
  total = 0;
  showResult = false;

  isSubmitted = false;

  fromResults = false;

  showStartScreen = true;

  ngOnInit() {
    this.fromResults = history.state.fromResults;

    const id = this.route.snapshot.paramMap.get('id');

    this.api.getQuizById(id).subscribe((res: any) => {
      this.quiz = res;

      if(!this.fromResults){
        this.quiz.questions.forEach((q: any) => {
        q.userAnswer = '';
      });

      this.timeLeft = this.quiz.timeLimit;
    }
    this.cdr.detectChanges();
    }); 
  }

  startTimer(){
    this.interval = setInterval(() => {
      if(this.timeLeft > 0){
        this.timeLeft--;
        this.cdr.detectChanges();
      }else{
        clearInterval(this.interval);
        this.submitQuiz();
      }
    }, 1000);
  }

  toggleMultipleAnswer(question: any, option: string){
    if(!question.userAnswerArray){
      question.userAnswerArray = [];
    }

    const index = question.userAnswerArray.indexOf(option);
    if(index > -1){
      question.userAnswerArray.splice(index, 1);
    }else{
      question.userAnswerArray.push(option);
    }
    question.userAnswer = question.userAnswerArray.join(',');
  }

  beginQuiz(){
    this.showStartScreen = false;

    this.cdr.detectChanges();

    this.startTimer();
  }

  submitQuiz(){ 
    if(this.isSubmitted) return;
    this.isSubmitted = true;

    clearInterval(this.interval);

    const answers = this.quiz.questions.map((q:any) => ({
      questionId: q.id,
      answer: (q.userAnswer || '').trim()
    }));
    const payload = {
      quizId: this.quiz.id,
      answers: answers,
      email: localStorage.getItem('email') || ''
    };
    console.log('PAYLOAD',payload);
    console.log('QUIZ', this.quiz);
    this.api.submitQuiz(payload).subscribe({
      next: (res:any) => {
        this.score = res.score;
        this.total = res.total;
        this.resultDetails = res.details;
        this.showResult = true;

        localStorage.setItem('lastResultDetails', JSON.stringify(res.details));

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert('Error submitting quiz');
      }
    });
  }

  goBack(){
    this.router.navigate(['quizzes']);
  }
}
