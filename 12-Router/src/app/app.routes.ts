import { Routes } from '@angular/router';
import { FallbackComponent } from './tasks/fallback/fallback.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  { path: '',              component: FallbackComponent },
  { path: 'users/:userId', component: TasksComponent    },
];
