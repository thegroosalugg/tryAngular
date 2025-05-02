import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
     selector: 'app-tasks',
      imports: [DatePipe, RouterLink],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})

export class TasksComponent {
  userId = input.required<string>(); // receives URL params from parent route
    sort = input<'date' | 'alpha'>(); // received via queryParams
   order = input<'asc'  |  'desc'>(); // received via queryParams
  private router = inject(Router);
  private  tasks = inject(TasksService);

  userTasks = computed(() =>
    this.tasks.byUser(this.userId()).sort((a, b) => {
      let sortIndex: keyof Task = 'dueDate';
      if (this.sort() === 'alpha') sortIndex = 'title';
      return this.order() === 'desc'
        ? a[sortIndex] > b[sortIndex]
          ? -1
          : 1
        : a[sortIndex] > b[sortIndex]
        ? 1
        : -1;
    })
  );

  setOrder(): 'asc' | 'desc' {
    if (!this.order()) return 'desc';
    return this.order() === 'asc' ? 'desc' : 'asc';
  }

  sortBy(filter: string) {
    this.router.navigate([], { // empty array keeps to current path
      queryParams: { sort: filter }, // programatically set query params
      queryParamsHandling: 'merge', // merges any existing query params
    });
  }

  markCompleted(task: Task) {
    this.tasks.remove(task);
  }
}
