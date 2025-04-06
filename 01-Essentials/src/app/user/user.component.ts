import { Component, computed, EventEmitter, Input, input, output, Output } from '@angular/core';
import { User } from '../models/User';

@Component({
     selector: 'app-user',
      imports: [],
  templateUrl: './user.component.html',
     styleUrl: './user.component.scss',
})

export class UserComponent {
  // older Angular @decorators: use Zone.js to scan whole app for changes
  // @Input({ required: true }) user!: User; // @Input: equivalent to FC props in React
  // @Output() select = new EventEmitter(); // @Output: used to emit events to parent component

  // user lowercase input to construct class using signals instead of decorators
  // user = input<User>({ id: '0', name: '', img: '' }); // can pass default values
  user   = input.required<User>();                         // or set .required
  select = output<User>(); // signal to emit events to parent component

  imgPath = computed(() => `/users/${this.user().img}`); // user computed when using signals
  // get imgPath() { // use getter method with @decorators. Is called as a prop, not fn()
    // return `/users/${this.user.img}`;
  // }

  selectUser() { // user() when using signals. Remove () when using @decorators
    this.select.emit(this.user()); // emit event to parent component
  }
}
