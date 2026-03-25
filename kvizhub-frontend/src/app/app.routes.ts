import { Routes } from '@angular/router';
import { Quizzes } from './pages/quizzes/quizzes';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {path: '', component: Login },
    {path: 'login', component: Login },
    {path: 'quizzes', component: Quizzes },
    {path: 'register', component: Register }
];


