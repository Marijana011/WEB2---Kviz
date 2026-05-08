import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ApiService } from '../../services/api';
import { error } from 'console';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  location = inject(Location);

  errorMessage = '';

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

  categories = [
  'Programming',
  'History',
  'Science',
  'Math',
  'Geography'
  ];

  quiz = {
  title: '',
  description: '',
  difficulty: '',
  category: '', 
  questions: [
    {
      text: '',
      type: 'Single',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: ''
    }
  ]
  };

  goBack(){
    this.location.back();
  }

  addQuestion() {
    const lastQuestion = this.quiz.questions[this.quiz.questions.length - 1];

    this.errorMessage = '';

    if (!lastQuestion.text.trim() || !lastQuestion.correctAnswer.trim()) {
      this.errorMessage = 'Please fill current question first!';
      return;
    }

  if (lastQuestion.type === 'Single' || lastQuestion.type === 'Multiple') {
    if (!lastQuestion.optionA.trim() || !lastQuestion.optionB.trim()) {
      this.errorMessage = 'Please fill at least Option A and B!';
      return;
    }
  }

  this.quiz.questions.push({
    text: '',
    type: 'Single',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  });
}


  isQuestionValid(q: any): boolean {

  if (!q.text.trim()) return false;

  if (q.type === 'Single') {
    if (!q.optionA.trim() || !q.optionB.trim()) return false;
    if (!q.correctAnswer.trim()) return false;

    const options = [
      q.optionA.trim(),
      q.optionB.trim(),
      q.optionC.trim(),
      q.optionD.trim()
    ].filter(o => o);

    return options.includes(q.correctAnswer.trim());
  }

  if (q.type === 'Multiple') {
    if (!q.optionA.trim() || !q.optionB.trim()) return false;
    if (!q.correctAnswer.trim()) return false;

    return true;
  }

  if (q.type === 'TrueFalse') {
    return q.correctAnswer === 'True' || q.correctAnswer === 'False';
  }

  if (q.type === 'Input') {
    return q.correctAnswer.trim().length > 0;
  }

  return false;
}

  isLastQuestionValid(): boolean {
  const q = this.quiz.questions[this.quiz.questions.length - 1];
  return this.isQuestionValid(q);
}

  createQuiz() {
    if (!this.quiz.title.trim() ||
      !this.quiz.description.trim() ||
      !this.quiz.difficulty ||
      !this.quiz.category) {
    alert('Please fill all quiz fields!');
    return;
  }

  if (!this.quiz.questions || this.quiz.questions.length === 0) {
    alert('Add at least one question!');
    return;
  }

  const invalidIndex = this.quiz.questions.findIndex(q => !this.isQuestionValid(q));

  if (invalidIndex !== -1) {
  alert(`Question ${invalidIndex + 1} is not valid!`);
  return;
  }

  this.api.createQuiz(this.quiz).subscribe({
    next: (res) => {
      console.log(res);
      alert('Quiz created successfully');
      this.router.navigate(['/quizzes']);
    },
    error: (err) => {
      console.log(err);
      alert('Error creating quiz');
    }
  });
}
}