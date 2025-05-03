import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { FooterComponent } from './footer/footer.component';

@Component({
     selector: 'app-root',
      imports: [RouterOutlet, HeaderComponent, FooterComponent, UsersComponent],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '13-LazyLoading';
}
