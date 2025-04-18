import { Component, inject, signal } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavService } from './navigation/navigation.service';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { FooterComponent } from './footer/footer.component';
// import { RouterOutlet } from '@angular/router';

const imports = [
  NavigationComponent,
  DashboardComponent,
  LifecycleComponent,
  FooterComponent,
];
@Component({
     selector: 'app-root',
      imports,
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss',
})
export class AppComponent {
  nav = inject(NavService); // alternative way of injecting services
}
