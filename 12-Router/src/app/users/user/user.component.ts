import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
     selector: 'app-user',
      imports: [RouterOutlet, RouterLink],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  // userId = input.required<string>(); // received via URL - names must match routes/:id
  private          users = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute); // *Observable alternative to input()
  private     destroyRef = inject(DestroyRef);
  private         router = inject(Router);
  userName = signal('');

  ngOnInit() {
    const subscription = this.activatedRoute.paramMap.subscribe({
      // subscribe to paramMap to get userId
      next: (paramMap) => {
        const userId = paramMap.get('userId');
        if (userId) {
          const user = this.users.find(userId);
          if (user) {
            this.userName.set(user.name);
            return; // user found - return function early
          }
        } // user not found - navigate to root
        this.router.navigate(['']);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
