import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard implements OnInit{

  api = inject(ApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  results: any[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('QUIZ ID:', id);

    this.api.getLeaderboard(id).subscribe({
      next: (res:any) => {
        console.log('LEADERBOARD:', res);

        this.results = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goBack(){
    this.router.navigate(['/quizzes']);
  }

}
