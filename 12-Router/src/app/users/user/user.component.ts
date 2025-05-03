import { Component, DestroyRef, effect, inject, input, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
     selector: 'app-user',
      imports: [RouterOutlet, RouterLink],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userId = input.required<string>(); // received via URL - names must match routes/:id
  // private          users = inject(UsersService); // find user by userId
  // private         router = inject(Router); // redirect
  private activatedRoute = inject(ActivatedRoute); // *OBSERVABLE alternative to input()
  // private     destroyRef = inject(DestroyRef); // *OBSERVABLE - unsubscribe
  // userName = signal('');   // *SIGNAL & *OBSERVABLE APPROACH - update this value
  userName = input<string>(); // ResolveFn data: re-runs when route params change
  message  = input<string>(); // Route config can pass custom data

  // constructor() { // *SIGNAL based route protection
  //   effect(() => {
  //     const user = this.users.find(this.userId());
  //     if (!user) {
  //       this.router.navigate(['']);
  //       return;
  //     }
  //     this.userName.set(user.name);
  //   });
  // }

  ngOnInit() { // *OBSERVABLE based route protection
    console.log(this.userName(), this.message());
    // *OBSERVABLE method for getting query parameters
    this.activatedRoute.queryParams.subscribe({ next: (val) => console.log(val)});
    // *OBSERVABLE method for getting both, router Data & ResolveFn data
    this.activatedRoute.data.subscribe({ next: (val) => console.log(val)});

    // console.log(this.activatedRoute.snapshot); // single snapshot of subscribable data

    // *OBSERVABLE method for getting dynamic ID parameters
    // const subscription = this.activatedRoute.paramMap.subscribe({
    //   next: (paramMap) => {
    //     const userId = paramMap.get('userId');
    //     if (userId) {
    //       const user = this.users.find(userId);
    //       if (user) {
    //         this.userName.set(user.name);
    //         return; // user found - return function early
    //       }
    //     } // user not found - navigate to root
    //     this.router.navigate(['']);
    //   },
    // });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

// resolvers allow you to outsource route logic and lean the component
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, // receives 2 snapshots automatically
     routerState: RouterStateSnapshot
) => {
  const  users = inject(UsersService); // can inject services
  const router = inject(Router);
  const userId = activatedRoute.paramMap.get('userId');
  if (userId) {
    const user = users.find(userId);
    if (user) return user.name;
  }
  // const root = router.parseUrl('/'); // TS example - basic URL tree creation
  const root = router.createUrlTree(['']); // can create more complex tree from current path
  return new RedirectCommand(root); // ResolveFn must return <T> | <RedirectCommand>
}; // RedirectCommand requires a URL tree
