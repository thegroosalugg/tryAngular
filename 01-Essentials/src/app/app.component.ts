import { Component, inject, signal } from '@angular/core';
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
import { ModalService } from './modal/modal.service';

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
   user = signal<User | null>(null);

  // by adding public/private to a constructor, we can shorthand the initialization
  // of the class properties. This is a TypeScript feature. No need for this.modal = modal;
  constructor(public modal: ModalService) {}
  // inject(class) is an alternative to the constructor. It does the same thing
  // public modal = inject(ModalService); // inject the modal service

  onSelectUser(user: User) {
    this.user.set(user); // emitted values from child component
  }

  onCompleteTask(task: Task) {
    const update = this.tasks().filter(({ id }) => id !== task.id); // remove completed tasks
    this.tasks.set(update);
  }

  onNewTask(task: Task) {
    this.tasks.update((prev) => [task, ...prev]);
  }

  onToggleModal(toggle: boolean) {
    this.modal.toggleModal(toggle);
  }
}
