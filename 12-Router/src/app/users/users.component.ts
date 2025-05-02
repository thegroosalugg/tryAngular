import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
     selector: 'app-user',
      imports: [RouterLink, RouterLinkActive],
  templateUrl: './users.component.html',
     styleUrl: './users.component.scss',
})

export class UsersComponent {
  constructor(public users: UsersService) {}
}
