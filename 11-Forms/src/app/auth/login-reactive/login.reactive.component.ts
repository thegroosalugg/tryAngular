import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// *REACTIVE APPROACH
@Component({
     selector: 'app-login-reactive',
      imports: [ReactiveFormsModule], // as opposed to FormsModule
  templateUrl: './login.reactive.component.html',
     styleUrl: './login.reactive.component.scss',
})
export class LoginReactiveComponent {
  form = new FormGroup({
       email: new FormControl(''), // initial values optional
    password: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form);
    const { email, password } = this.form.value; // reactive forms offer better TS support
    console.log(email, password);
  }
}
