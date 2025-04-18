import { Component, OnInit, signal } from '@angular/core';

@Component({
     selector: 'app-status',
      imports: [],
  templateUrl: './status.component.html',
     styleUrl: './status.component.scss',
})
// Class 'implements' OnInit (type) throws TS warning when ngOnInit is missing or mispelled
export class StatusComponent implements OnInit {
  status = signal<'online' | 'offline' | 'restarting'>('online');

  // ngOnInit runs once after inputs initialised and has access to their values
  ngOnInit() { // better than constructor() {}
    setInterval(() => {
      if (Math.random() > 0.5) {
        this.status.set('online');
      } else if (Math.random() < 0.1) {
        this.status.set('offline');
      } else {
        this.status.set('restarting');
      }
    }, 5000);
  }
}
