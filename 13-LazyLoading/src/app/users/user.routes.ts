import { CanDeactivateFn, CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { TaskFormComponent } from 'app/tasks/task-form/task-form.component';
import { resolveUserTasks, TasksComponent } from 'app/tasks/tasks.component';
import { resolveUserName } from './user/user.component';
import { inject } from '@angular/core';

const dummyGuardGn: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  if (Math.random() > 0.15) {
    return true;
  } else {
    const urlTree = router.parseUrl('/unathorised');
    return new RedirectCommand(urlTree);
  }
};

const exitPageGuard: CanDeactivateFn<TaskFormComponent> = (Component) => {
  if (Component.submitted()) return true;
  const { title, dueDate, summary } = Component;
  if (title() || dueDate() || summary()) {
    return window.confirm('Are you sure?');
  }
  return true;
};

// </users/:userId>
export const userRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'prefix' },
  {
                     path: 'tasks', // </users/:userId/tasks>
                component: TasksComponent,
    runGuardsAndResolvers: 'always',
                  resolve: { userTasks: resolveUserTasks },
                    title: resolveUserName
  },
  {
             path: 'tasks/new', // </users/:userId/tasks/new>
        component: TaskFormComponent,
         canMatch: [dummyGuardGn],
    canDeactivate: [exitPageGuard],
            title: 'New Task'
  },
];
