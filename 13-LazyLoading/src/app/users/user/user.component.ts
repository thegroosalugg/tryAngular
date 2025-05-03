import { Component, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
     selector: 'app-user',
      imports: [RouterOutlet, RouterLink],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss'
})
export class UserComponent {
  userName = input<string>();
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
     routerState: RouterStateSnapshot
) => {
  const  users = inject(UsersService);
  const router = inject(Router);
  const userId = activatedRoute.paramMap.get('userId');
  if (userId) {
    const user = users.find(userId);
    if (user) return user.name;
  }
  const root = router.createUrlTree(['']);
  return new RedirectCommand(root);
};
