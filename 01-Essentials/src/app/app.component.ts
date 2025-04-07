import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { USERS } from '../data/users';
import { User } from './models/User';
import { TasksComponent } from './tasks/tasks.component';

@Component({
     selector: 'app-root',
      imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})

export class AppComponent {
  title = '01-Essentials';
  users = USERS
  user: User | null = null;

  onSelect(user: User) {
    this.user = user;
  }
}
