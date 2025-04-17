import { Component, signal } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { RouterOutlet } from '@angular/router';

@Component({
     selector: 'app-root',
      imports: [NavigationComponent, DashboardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
