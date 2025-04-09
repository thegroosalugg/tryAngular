import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { User } from 'models/User';
import { Task } from 'models/Task';
import { USERS } from 'data/users';
import { TASKS } from 'data/tasks';
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
      tasks = signal<Task[]>(TASKS);
     isOpen = signal(false); // modal open state
  isClosing = signal(false); // tracks [Modal] closing (animation) state
       user = signal<User | null>(null);

  onSelectUser(user: User) {
    this.user.set(user); // emitted values from child component
  }

  onCompleteTask(task: Task) {
    const update = this.tasks().filter(({ id }) => id !== task.id); // remove completed tasks
    this.tasks.set(update);
  }

  onNewTask(task: Task) {
    this.tasks.update(prev => [task, ...prev]);
  }

  onToggleModal(shouldOpen: boolean) {
    if (shouldOpen) {
      this.isOpen.set(true);
    } else {
      this.isClosing.set(true); // start animation
      // Wait for animation to complete before emitting close event
      setTimeout(() => {
        this.isClosing.set(false); // end animation
        this.isOpen.set(false); // close modal
      }, 500); // matches animation duration
    }
  }
}
