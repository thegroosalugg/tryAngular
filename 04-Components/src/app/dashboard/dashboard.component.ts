import { Component } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { StatusComponent } from './status/status.component';
import { ChartComponent } from './chart/chart.component';

@Component({
     selector: 'app-dashboard',
      imports: [ArticleComponent, StatusComponent, ChartComponent],
  templateUrl: './dashboard.component.html',
     styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
