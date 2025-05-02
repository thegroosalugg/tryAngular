import { Component, inject } from '@angular/core';
import { UsersService } from './users.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
     selector: 'app-user',
      imports: [RouterLink, RouterLinkActive],
  templateUrl: './users.component.html',
     styleUrl: './users.component.scss',
})

export class UsersComponent {
  private service = inject(UsersService);
  users = this.service.users;
}
