import { Component } from '@angular/core';
import { TrafficService } from 'app/traffic.service';

@Component({
     selector: 'app-chart',
      imports: [],
  templateUrl: './chart.component.html',
     styleUrl: './chart.component.scss',
})
export class ChartComponent {
  constructor(public traffic: TrafficService) {}
}
