import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { ModalComponent } from './modal/modal.component';
import { UsersService } from './users/users.service';

const imports = [
  HeaderComponent,
  UsersComponent,
  TasksComponent,
  TaskFormComponent,
  ModalComponent,
  RouterOutlet,
];
@Component({
     selector: 'app-root',
      imports,
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '12-Router';
  constructor(public users: UsersService) {}
}
