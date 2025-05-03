import { Routes } from '@angular/router';
import { FallbackComponent } from './tasks/fallback/fallback.component';
import { resolveUserName, UserComponent } from './users/user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { userRoutes } from './users/user.routes';

export const routes: Routes = [
  { path: '', component: FallbackComponent, title: 'Home'},
  {
         path: 'users/:userId',
    component: UserComponent,
        data: { message: 'hello' },
     resolve: { userName: resolveUserName },
    children: userRoutes,
  },
  { path: '**', component: NotFoundComponent, title: 'Error' }
];
