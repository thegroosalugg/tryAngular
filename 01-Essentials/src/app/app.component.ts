import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { User } from 'models/User';
import { USERS } from 'data/users';
import { ModalComponent } from './modal/modal.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

const imports = [
  HeaderComponent,
  UserComponent,
  TasksComponent,
  TaskFormComponent,
  ModalComponent,
  // RouterOutlet,
];
@Component({
     selector: 'app-root',
      imports,
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})

export class AppComponent {
  title = '01-Essentials';
  users = signal<User[]>(USERS);
   user = signal<User | null>(null);

  onSelectUser(user: User) {
    this.user.set(user); // emitted values from child component
  }
}
