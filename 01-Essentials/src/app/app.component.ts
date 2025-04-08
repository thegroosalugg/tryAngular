import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { User } from './models/User';
import { Task } from './models/Task';
import { USERS } from '../data/users';
import { TASKS } from '../data/tasks';
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
  title     = '01-Essentials';
  users     = USERS;
  tasks     = TASKS;
  isOpen    = false; // modal open state
  isClosing = false; // tracks [Modal] closing (animation) state
  user: User | null = null;

  onSelectUser(user: User) {
    this.user = user; // emitted values from child component
  }

  onCompleteTask(task: Task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
  }

  onToggleModal(shouldOpen: boolean) {
    if (shouldOpen) {
      this.isOpen = true;
    } else {
      this.isClosing = true; // start animation
      // Wait for animation to complete before emitting close event
      setTimeout(() => {
        this.isClosing = false; // end animation
        this.isOpen    = false; // close modal
      }, 500); // matches animation duration
    }
  }
}
