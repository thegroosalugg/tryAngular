import { Component } from '@angular/core';
import { USERS } from '../../data/users';

@Component({
     selector: 'app-user',
      imports: [],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss',
})

export class UserComponent {
  private static random() {
    const index = Math.floor(Math.random() * USERS.length);
    return USERS[index];
  }

  user = UserComponent.random();

  // get: defines a getter method, so imgPath acts like a property, not a function
  get imgPath() {
    return `/users/${this.user.img}`;
  }

  selectUser() {
    this.user = UserComponent.random();
  }
}
