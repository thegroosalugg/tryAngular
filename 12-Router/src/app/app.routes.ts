import { Routes } from '@angular/router';
import { FallbackComponent } from './tasks/fallback/fallback.component';
import { resolveUserName, UserComponent } from './users/user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { userRoutes } from './users/user.routes';

export const routes: Routes = [
  { path: '', component: FallbackComponent, title: 'Home'},
  {
         path: 'users/:userId', // parent route
    component: UserComponent,
        data: { message: 'hello' }, // can add input() data to routes
     resolve: { userName: resolveUserName }, // resolver functions return <T> | redirect
    children: userRoutes, // outsource children routes
  },
  { path: '**', component: NotFoundComponent, title: 'Error' } // ** catch all other routes path
];
