import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { USERS } from '../data/users';
import { NgFor } from '@angular/common';

@Component({
     selector: 'app-root',
      imports: [NgFor, HeaderComponent, UserComponent],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '01-Essentials';
  users = USERS
}
