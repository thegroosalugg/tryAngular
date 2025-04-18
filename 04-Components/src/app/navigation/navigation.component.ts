import { Component } from '@angular/core';
import { NavService } from './navigation.service';
import { ButtonComponent } from 'app/shared/button/button.component';

@Component({
     selector: 'app-navigation',
      imports: [ButtonComponent],
  templateUrl: './navigation.component.html',
     styleUrl: './navigation.component.scss'
})

export class NavigationComponent {
  constructor(public nav: NavService) {}
}
