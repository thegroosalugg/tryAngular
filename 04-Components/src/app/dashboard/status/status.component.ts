import { Component } from '@angular/core';
import { TrafficService } from 'app/traffic.service';

@Component({
     selector: 'app-status',
      imports: [],
  templateUrl: './status.component.html',
     styleUrl: './status.component.scss',
})
export class StatusComponent {
  constructor(public traffic: TrafficService) {}
}
