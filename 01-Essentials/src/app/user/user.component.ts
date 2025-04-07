import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { User } from '../models/User';

@Component({
     selector: 'app-user',
      imports: [NgClass],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss',
})

export class UserComponent {
  users  = input.required<User[]>();
  select = output<User>();
  isActive: User | null = null;

  selectUser(user: User) { // user() when using signals. Remove () when using @decorators
    this.isActive = user;  // Set the selected user as active in local state
    this.select.emit(user); // emit event to parent component
  }
}
