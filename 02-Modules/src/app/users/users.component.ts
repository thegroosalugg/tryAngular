import { Component } from '@angular/core';
import { UsersService } from './users.service';

@Component({
     selector: 'app-user',
   standalone: false,
  templateUrl: './users.component.html',
     styleUrl: './users.component.scss',
})

export class UsersComponent {
  constructor(public users: UsersService) {}
}
