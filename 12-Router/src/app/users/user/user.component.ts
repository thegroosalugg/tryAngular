import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
     selector: 'app-user',
      imports: [RouterOutlet, RouterLink],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss'
})
export class UserComponent {
  userId = input.required<string>(); // received via URL - names must match routes/:id
  private users = inject(UsersService);
  userName = computed(() => this.users.find(this.userId())?.name);
}
