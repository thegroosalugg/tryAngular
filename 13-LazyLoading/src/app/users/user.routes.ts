import {
  CanDeactivateFn,
  CanMatchFn,
  RedirectCommand,
  Router,
  Routes,
} from '@angular/router';
import { TaskFormComponent } from 'app/tasks/task-form/task-form.component';
import { resolveUserTasks, TasksComponent } from 'app/tasks/tasks.component';
import { resolveUserName } from './user/user.component';
import { inject } from '@angular/core';
import { TasksService } from 'app/tasks/tasks.service';

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
  const { title, dueDate, summary, submitted } = Component;
  if ((title() || dueDate() || summary()) && !submitted()) {
    return window.confirm('Are you sure?');
  }
  return true;
};

// </users/:userId>
export const userRoutes: Routes = [
  { // to inject services, make a parent route wrapper and set all other routes as children
    path: '',
    providers: [TasksService], // services can be injected into routes instead of root
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      {
                         path: 'tasks', // </users/:userId/tasks>
                    component: TasksComponent,
        runGuardsAndResolvers: 'always',
                      resolve: { userTasks: resolveUserTasks },
                        title: resolveUserName,
      },
      {
                 path: 'tasks/new', // </users/:userId/tasks/new>
            component: TaskFormComponent,
             canMatch: [dummyGuardGn],
        canDeactivate: [exitPageGuard],
                title: 'New Task',
      },
    ],
  },
];
