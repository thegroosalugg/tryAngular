import { Component } from '@angular/core';
import { UsersService } from './users.service';

@Component({
     selector: 'app-user',
      imports: [],
  templateUrl: './users.component.html',
     styleUrl: './users.component.scss',
})

export class UsersComponent {
  constructor(public users: UsersService) {}
}
