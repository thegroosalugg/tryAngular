import { Routes } from '@angular/router';
import { TaskFormComponent } from 'app/tasks/task-form/task-form.component';
import { resolveUserTasks, TasksComponent } from 'app/tasks/tasks.component';

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
  },
  { path: 'tasks/new', component: TaskFormComponent }, // </users/:userId/tasks/new>
];
