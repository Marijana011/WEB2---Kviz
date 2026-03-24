import { Routes } from '@angular/router';
import { Quizzes } from './pages/quizzes/quizzes';
import { Login } from './pages/login/login';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'quizzes', component: Quizzes}
];


