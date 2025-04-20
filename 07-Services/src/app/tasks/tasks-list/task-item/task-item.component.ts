import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../../task.model';
import { TasksService } from 'app/tasks/tasks.service';

@Component({
     selector: 'app-task-item',
      imports: [FormsModule],
  templateUrl: './task-item.component.html',
     styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  constructor(public tasks: TasksService) {}
}
