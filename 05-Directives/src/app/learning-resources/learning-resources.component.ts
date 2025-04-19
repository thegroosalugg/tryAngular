import { Component } from '@angular/core';
import { LinkDirective } from 'app/shared/directives/link.directive';

@Component({
     selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
     styleUrl: './learning-resources.component.scss',
      imports: [LinkDirective]
})
export class LearningResourcesComponent {}
