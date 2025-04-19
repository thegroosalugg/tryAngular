import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { AuthDirective } from 'app/shared/directives/auth.directive';
import { AuthComponent } from './auth/auth.component';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';

@Component({
     selector: 'app-root',
      imports: [AuthComponent, AuthDirective, LearningResourcesComponent],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '05-Directives';
}
