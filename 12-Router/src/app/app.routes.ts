import { Routes } from '@angular/router';
import { FallbackComponent } from './tasks/fallback/fallback.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { UserComponent } from './users/user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: FallbackComponent },
  {
    path: 'users/:userId', // parent route
    component: UserComponent,
    children: [ // relative routes to parent
      { path: '', redirectTo: 'tasks', pathMatch: 'prefix' }, // ensures root path redirects to task
      { path: 'tasks',     component: TasksComponent       }, // </users/:userId/tasks>
      { path: 'tasks/new', component: TaskFormComponent    }, // </users/:userId/tasks/new>
    ],
  },
  { path: '**', component: NotFoundComponent } // ** catch all other routes path
];
