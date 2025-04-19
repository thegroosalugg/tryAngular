import { Injectable, signal } from '@angular/core';
import { Permission } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  permission = signal<Permission>('guest');

  login(email: string, password: string) {
    console.log(email, password);
    if (email === 'admin' && password === 'admin') {
      this.permission.set('admin');
    } else if (email === 'user' && password === 'user') {
      this.permission.set('user');
    } else {
      this.permission.set('guest');
    }
  }

  logout() {
    this.permission.set('guest');
  }
}
