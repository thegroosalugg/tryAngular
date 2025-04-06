// Basic example of Angular component
import { USERS } from '../../data/users';
import { Component, computed, signal } from '@angular/core';

// @Component({
//      selector: 'app-user',
//       imports: [],
//   templateUrl: './user.component.html',
//      styleUrl: './user.component.scss',
// })

export class UserComponent {
  private static random() {
    const index = Math.floor(Math.random() * USERS.length);
    return USERS[index];
  }

  // signal is an alternative to Zone.js
  user = signal(UserComponent.random()); // assign a signal to listen to value changes
  // user = UserComponent.random();

  // with signals, getters need to be defined with the computed function
  imgPath = computed(() => `/users/${this.user().img}`); // alt to getter method

  // getter method: imgPath is called like a property, not a function()
  // get imgPath() {
  //   return `/users/${this.user.img}`;
  // }

  selectUser() {
    this.user.set(UserComponent.random()); // signals use .set() to update the value
    // this.user = UserComponent.random();
  }
}
