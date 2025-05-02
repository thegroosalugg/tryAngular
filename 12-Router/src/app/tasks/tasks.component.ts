import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
     selector: 'app-tasks',
      imports: [DatePipe],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})

export class TasksComponent {
  userId = input.required<string>(); // receives URL params from parent route
  private tasks = inject(TasksService);

  userTasks = computed(() => this.tasks.byUser(this.userId()));

  markCompleted(task: Task) {
    this.tasks.remove(task);
  }
}
