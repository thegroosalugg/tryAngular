import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
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
     userId = input.required<string>();
  userTasks = input.required<Task[]>();
       sort = input<'date' | 'alpha'>('date');
      order = input<'asc'  |  'desc'>('asc');
  private         router = inject(Router);
  private          tasks = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);

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
    this.router.navigate([], {
      queryParams: { sort },
      queryParamsHandling: 'merge',
    });
  }

  markCompleted(task: Task) {
    this.tasks.remove(task);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: 'reload',
      queryParamsHandling: 'preserve'
    });
  }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const  tasks = inject(TasksService);
  const userId = activatedRoute.paramMap.get('userId');
  const { sort, order } = activatedRoute.queryParams;
  if (!userId) return [];
  return tasks.byUser(userId).sort((a, b) => {
    const key =  sort === 'alpha' ? 'title' : 'dueDate';
    const dir = order === 'desc'  ?      -1 : 1;
    return     a[key]  >  b[key]  ?     dir : -dir;
  });
};
