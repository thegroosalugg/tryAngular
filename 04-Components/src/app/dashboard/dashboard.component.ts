import { Component } from '@angular/core';
import { TrafficService } from 'app/traffic.service';
import { ArticleComponent } from './article/article.component';

@Component({
     selector: 'app-dashboard',
      imports: [ArticleComponent],
  templateUrl: './dashboard.component.html',
     styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(public traffic: TrafficService) {}
}
