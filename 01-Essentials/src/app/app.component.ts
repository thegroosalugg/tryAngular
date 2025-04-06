import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { USERS } from '../data/users';
import { User } from './models/User';

@Component({
     selector: 'app-root',
      imports: [HeaderComponent, UserComponent],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '01-Essentials';
  users = USERS

  onSelect(user: User) {
    console.log(user);
  }
}
