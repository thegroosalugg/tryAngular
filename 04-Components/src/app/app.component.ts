import { Component, inject, signal } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavService } from './navigation/navigation.service';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
// import { RouterOutlet } from '@angular/router';

@Component({
     selector: 'app-root',
      imports: [NavigationComponent, DashboardComponent, LifecycleComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  nav = inject(NavService); // alternative way of injecting services
}
