import { Component, computed, EventEmitter, Input, input, output, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { User } from '../models/User';

@Component({
     selector: 'app-user',
      imports: [NgFor],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss',
})

export class UserComponent {
  users  = input.required<User[]>();
  select = output<User>();

  selectUser(user: User) { // user() when using signals. Remove () when using @decorators
    this.select.emit(user); // emit event to parent component
  }
}
