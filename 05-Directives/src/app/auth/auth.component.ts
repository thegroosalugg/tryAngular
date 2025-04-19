import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
     selector: 'app-auth',
      imports: [FormsModule],
  templateUrl: './auth.component.html',
     styleUrl: './auth.component.scss',
})
export class AuthComponent {
     email = signal('');
  password = signal('');
  private auth = inject(AuthService);

  onSubmit() {
    this.auth.login(this.email(), this.password());
  }
}
