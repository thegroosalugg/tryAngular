import { Routes } from '@angular/router';
import { FallbackComponent } from './tasks/fallback/fallback.component';
import { resolveUserName, UserComponent } from './users/user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: FallbackComponent, title: 'Home' },
  {
    path: 'users/:userId',
    component: UserComponent,
    data: { message: 'hello' },
    resolve: { userName: resolveUserName },
    // children: userRoutes,
    // use loadComponent/loadChildren for lazy loading
    loadChildren: () => // delete unused imports or it will load eagerly
      import('./users/user.routes').then((mod) => mod.userRoutes),
  }, // separate imports to own files or everything on that pages loads too
  { path: '**', component: NotFoundComponent, title: 'Error' },
];
