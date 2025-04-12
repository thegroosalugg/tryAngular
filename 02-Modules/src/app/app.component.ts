import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { UsersService } from './users/users.service';

@Component({
     selector: 'app-root',
   standalone: false, // when using NgMododules
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})

export class AppComponent {
  title = '02-modules';

  constructor(public users: UsersService) {}
}
