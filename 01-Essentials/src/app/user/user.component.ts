import { Component, Input } from '@angular/core';
import { User } from '../models/User';

@Component({
     selector: 'app-user',
      imports: [],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss',
})

export class UserComponent {
  @Input({ required: true }) user!: User; // @Input: equivalent to FC props in React

  get imgPath() {
    return `/users/${this.user.img}`;
  }

  selectUser() {}
}
