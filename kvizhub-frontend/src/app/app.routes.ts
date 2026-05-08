import { Routes } from '@angular/router';
import { Quizzes } from './pages/quizzes/quizzes';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CreateQuiz } from './pages/create-quiz/create-quiz';
import { QuizDetails } from './pages/quiz-details/quiz-details';

export const routes: Routes = [
    {path: '', component: Login },
    {path: 'login', component: Login },
    {path: 'quizzes', component: Quizzes },
    {path: 'register', component: Register },
    {path: 'create-quiz', component: CreateQuiz},
    {path: 'quiz-details/:id', component: QuizDetails},
    {path: 'my-results', loadComponent: () => import('./pages/my-results/my-results').then(m => m.MyResults)},
    {path: 'result-details', loadComponent: () => import('./pages/result-details/result-details').then(m => m.ResultDetails)},
    {path: 'leaderboard/:id', loadComponent: () => import('./pages/leaderboard/leaderboard').then(m => m.Leaderboard)}
];


