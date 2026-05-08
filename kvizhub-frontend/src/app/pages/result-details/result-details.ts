import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-result-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-details.html',
  styleUrl: './result-details.css',
})
export class ResultDetails implements OnInit {

  api = inject(ApiService);

  result: any;
  details: any[] = [];


  ngOnInit() {
    this.result = history.state.result;
    this.details = history.state.details || [];
  }
}
