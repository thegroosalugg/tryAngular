import { Injectable, signal } from '@angular/core';
import { User } from './user.model';

export const USERS = [
  { id: 'u1', name: 'Jasmine Washington', img: 'user-1.jpg' },
  { id: 'u2', name: 'Emily Thompson',     img: 'user-2.jpg' },
  { id: 'u3', name: 'Marcus Johnson',     img: 'user-3.jpg' },
  { id: 'u4', name: 'David Miller',       img: 'user-4.jpg' },
  { id: 'u5', name: 'Priya Patel',        img: 'user-5.jpg' },
  { id: 'u6', name: 'Arjun Singh',        img: 'user-6.jpg' },
];

@Injectable({ providedIn: 'root' })
export class UsersService {
  users = signal<User[]>(USERS);
  active = signal<User | null>(null);
}
