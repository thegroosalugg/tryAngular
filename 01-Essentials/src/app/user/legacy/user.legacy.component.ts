// Basic example of Angular component
import { USERS } from 'data/users';
import { Component, computed, EventEmitter, Input, input, Output, output, signal } from '@angular/core';
import { User } from 'models/User';

@Component({
     selector: 'app-user-legacy',
      imports: [],
  templateUrl: './user.legacy.component.html',
    //  styleUrl: './user.legacy.component.scss',
})

// using @decorators & zone.js
export class UserLegacyComponent {
  private static random() {
    const index = Math.floor(Math.random() * USERS.length);
    return USERS[index];
  }

  // older Angular @decorators: use Zone.js to scan whole app for changes
  @Input({ required: true }) user!: User;      //  @Input: equivalent to FC props in React
  @Output() select = new EventEmitter<User>(); // @Output: used to emit events to parent component
  selected = UserLegacyComponent.random(); // value declared without imports

  // use getter method with @decorators. Is called as a prop, not fn()
  // getters/computed() are not invoked like regular functions:
  // instead they are treated as a prop and show the latest value at all times like an Effect
  get imgPath() {
    return `/users/${this.user.img}`; // getters return latest value due to Zone.js tracking
  }

  selectUser() {
    this.selected = UserLegacyComponent.random(); // can directly overwrite class values
    this.select.emit(this.user); // emit value to parent component
  }
}

@Component({
     selector: 'app-user-signal',
      imports: [],
  templateUrl: './user.signal.component.html',
    //  styleUrl: './user.signal.component.scss',
})

// using signals
export class UserSignalComponent {
  private static random() {
    const index = Math.floor(Math.random() * USERS.length);
    return USERS[index];
  }

  // user lowercase input/output when using signals. Values now accessed as functions()
  // user  = input<User>({ id: '0', name: '', img: '' }); // can pass default values
  user     = input.required<User>(); // or set .required. Used to receive props from parent
  select   = output<User>(); // signal to emit events to parent component
  selected = signal(UserSignalComponent.random()); // passes tracked value to children
  imgPath  = computed(() => `/users/${this.user().img}`); // use computed when using signals
  // getters won't work with Signals due to lack of Zone.js tracking. Computed is the alternative

  selectUser() {
    this.selected.set(UserSignalComponent.random()); // signals use .set() to set the value of this
    this.select.emit(this.user()); // emit value to parent component
  }
}
