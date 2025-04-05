import { Component } from '@angular/core';
import { USERS } from '../../data/users';

const rIndex = Math.floor(Math.random() * USERS.length);

@Component({
     selector: 'app-user',
      imports: [],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss',
})
export class UserComponent {
  user = USERS[rIndex];
}
