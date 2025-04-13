import { Injectable, signal } from '@angular/core';
import { User } from 'models/User';
import { USERS } from 'data/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users  = signal<User[]>(USERS);
  active = signal<User | null>(null);

  select(user: User) {
    this.active.set(user);
  }
}
