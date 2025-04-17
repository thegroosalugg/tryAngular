import { Component } from '@angular/core';
import { TrafficService } from 'app/traffic.service';

@Component({
     selector: 'app-dashboard',
      imports: [],
  templateUrl: './dashboard.component.html',
     styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(public traffic: TrafficService) {}
}
