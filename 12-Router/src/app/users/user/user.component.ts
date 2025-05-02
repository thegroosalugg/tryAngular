import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
     selector: 'app-user',
      imports: [RouterOutlet, RouterLink],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userId = input.required<string>(); // received via URL - names must match routes/:id
  private          users = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute); // *Observable alternative to input()
  private     destroyRef = inject(DestroyRef);
  userName = computed(() => this.users.find(this.userId())?.name);

  ngOnInit() {
    const subscription = this.activatedRoute.paramMap.subscribe({
      // subscribe to paramMap to get userId
      next: (paramsMap) => console.log('User ID:', paramsMap.get('userId')),
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
