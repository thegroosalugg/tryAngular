import { Component, signal } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
     selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
     styleUrl: './tasks-list.component.scss',
      imports: [TaskItemComponent],
})
export class TasksListComponent {
  constructor(public tasks: TasksService) {}
}
