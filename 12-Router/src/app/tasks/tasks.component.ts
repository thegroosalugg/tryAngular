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
    sort = input<'date' | 'alpha'>('date'); // received via queryParams
   order = input<'asc'  |  'desc'>('asc'); // received via queryParams
  private router = inject(Router);
  private  tasks = inject(TasksService);

  userTasks = computed(() =>
    this.tasks.byUser(this.userId()).sort((a, b) => {
      const key = this.sort()  === 'alpha' ? 'title' : 'dueDate';
      const dir = this.order() === 'desc'  ?      -1 : 1;
      return           a[key]   >   b[key] ?     dir : -dir;
    })
  );

  private setDefault(searchTerms: string[], query: string) {
    return searchTerms.includes(query) ? query : searchTerms[0];
  }

  defaultOption = computed(() => this.setDefault(['date', 'alpha'], this.sort()));
  defaultOrder  = computed(() => this.setDefault(['asc',   'desc'], this.order()));

  setOrder(): 'asc' | 'desc' {
    if (!['asc', 'desc'].includes(this.order())) return 'desc';
    return this.order() === 'asc' ? 'desc' : 'asc';
  }

  sortBy(sort: string) {
    this.router.navigate([], { // empty array keeps to current path
      queryParams: { sort }, // programatically set query params
      queryParamsHandling: 'merge', // merges any existing query params
    });
  }

  markCompleted(task: Task) {
    this.tasks.remove(task);
  }
}
