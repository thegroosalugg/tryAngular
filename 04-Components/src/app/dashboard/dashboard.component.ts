import { Component } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { StatusComponent } from './status/status.component';
import { ChartComponent } from './chart/chart.component';
import { TicketsComponent } from './tickets/tickets.component';

const imports = [
  ArticleComponent,
   StatusComponent,
    ChartComponent,
  TicketsComponent,
];

@Component({
     selector: 'app-dashboard',
      imports,
  templateUrl: './dashboard.component.html',
     styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
