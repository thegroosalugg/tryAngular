import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { User } from './models/User';
import { Task } from './models/Task';
import { USERS } from '../data/users';
import { TASKS } from '../data/tasks';
import { ModalComponent } from './modal/modal.component';

@Component({
     selector: 'app-root',
      imports: [HeaderComponent, UserComponent, TasksComponent, ModalComponent],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})

export class AppComponent {
  title = '01-Essentials';
  users = USERS
  tasks = TASKS
  user: User | null = null;
  showModal = false;

  onSelect(user: User) {
    this.user = user; // emitted values from child component
  }

  onComplete(task: Task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
  }

  onToggleModal(toggle: boolean) {
    this.showModal = toggle;
  }
}
