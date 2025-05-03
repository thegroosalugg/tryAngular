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
     userId = input.required<string>(); // receives URL params from parent route
  userTasks = input.required<Task[]>(); // when using *ResolveFn
       sort = input<'date' | 'alpha'>('date'); // received via queryParams
      order = input<'asc'  |  'desc'>('asc'); // received via queryParams
  private         router = inject(Router);
  private          tasks = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute); // required for relative to this path navigation

  // original contained function
  // userTasks = computed(() =>
  //   this.tasks.byUser(this.userId()).sort((a, b) => {
  //     const key = this.sort()  === 'alpha' ? 'title' : 'dueDate';
  //     const dir = this.order() === 'desc'  ?      -1 : 1;
  //     return           a[key]   >   b[key] ?     dir : -dir;
  //   })
  // );

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
    // trigger page reload with navigate so ResolveFn can re-run
    this.router.navigate([], { // empty array keeps to current path
      relativeTo: this.activatedRoute, // resolve navigation path relative to current route
      onSameUrlNavigation: 'reload', // no path change - retrigger component lifecycle
      queryParamsHandling: 'preserve' // preserves query parameters
    });
  }
}

// resolvers allow you to outsource route logic and lean the component
export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot, // receives 2 snapshots automatically
  routerState: RouterStateSnapshot
) => {
  const  tasks = inject(TasksService);
  const userId = activatedRoute.paramMap.get('userId'); // Map based API for params
  const   sort = activatedRoute.queryParams['sort']; // Object based: gets raw values
  const  order = activatedRoute.queryParams['order']; // can also use queryParamMap.get()
  if (!userId) return [];
  return tasks.byUser(userId).sort((a, b) => {
    const key =  sort === 'alpha' ? 'title' : 'dueDate';
    const dir = order === 'desc'  ?      -1 : 1;
    return     a[key]  >  b[key]  ?     dir : -dir;
  });
};
