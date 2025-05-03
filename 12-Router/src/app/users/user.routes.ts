import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { TaskFormComponent } from 'app/tasks/task-form/task-form.component';
import { resolveUserTasks, TasksComponent } from 'app/tasks/tasks.component';
import { resolveUserName } from './user/user.component';
import { inject } from '@angular/core';

// canMatchFn is a route guard function, like my resolveUserName Fn, returns RedirectCommand
const dummyGuardGn: CanMatchFn = (route, segments) => {
  // receives route data and segments of the url path
  const router = inject(Router);
  if (Math.random() < 0.25) {
    return true; // should return boolean | <RedirectCommand>
  } else {
    const urlTree = router.parseUrl('/unathorised');
    return new RedirectCommand(urlTree);
  }
};

// children paths are relative to parent </users/:userId>
export const userRoutes: Routes = [
  // ensures root path redirects to /users/:userId/tasks
  { path: '', redirectTo: 'tasks', pathMatch: 'prefix' },
  {
         path: 'tasks', // </users/:userId/tasks>
    component: TasksComponent,
    // by default, ResolveFn does not re-run when queryParamsChange - it must be configured
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      userTasks: resolveUserTasks,
    },
    title: resolveUserName // meta-title can also accept a ResolverFn to set dynamic title
  },
  {
    path: 'tasks/new', // </users/:userId/tasks/new>
    component: TaskFormComponent,
    canMatch: [dummyGuardGn], // set an array of route guarding functions
    title: 'New Task'
  },
];
