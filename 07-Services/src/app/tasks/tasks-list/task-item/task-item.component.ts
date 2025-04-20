import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../task.model';
import { TasksService } from 'app/tasks/tasks.service';

@Component({
     selector: 'app-task-item',
      imports: [FormsModule],
  templateUrl: './task-item.component.html',
     styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  task = input.required<Task>();
  getStatus = computed(() =>
    ({
             open: 'Open',
      in_progress: 'Working on it',
             done: 'Completed',
    }[this.task().status])
  );
  constructor(public tasks: TasksService) {}
}
