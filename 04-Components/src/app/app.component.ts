import { Component, signal } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
// import { RouterOutlet } from '@angular/router';

@Component({
     selector: 'app-root',
      imports: [NavigationComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  trafficData = signal([
    { id: 'd1',  value: 433 },
    { id: 'd2',  value: 260 },
    { id: 'd3',  value: 290 },
    { id: 'd4',  value: 410 },
    { id: 'd5',  value: 397 },
    { id: 'd6',  value: 488 },
    { id: 'd47', value: 589 },
  ]);
  maxTraffic = signal(
    Math.max(...this.trafficData().map((data) => data.value))
  );
  isOnline = signal(true);
}
