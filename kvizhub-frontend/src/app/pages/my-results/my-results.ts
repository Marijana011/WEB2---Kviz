import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-my-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-results.html',
  styleUrl: './my-results.css',
})
export class MyResults implements OnInit {

  api = inject(ApiService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  results: any[] = [];
  loaded = false;

  ngOnInit() {
    if(typeof window !== 'undefined'){
      const email = localStorage.getItem('email') || '';
      console.log('EMAIL:', email);


      this.api.getUserResults(email).subscribe({
        next: (res:any) => {
          console.log('RESULTS:', res);

          this.results = res || [];
          this.loaded = true;

          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.log(err);
          this.loaded = true;
        }
      });
    }
  }

  viewDetails(r: any){
    const details = localStorage.getItem('lastResultDetails');

    this.router.navigate(['/result-details'],{
      state: {result: r, details: details ? JSON.parse(details) : []}
    });
  }

  goBack(){
    this.router.navigate(['/quizzes']);
  }
}
