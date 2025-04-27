import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// *REACTIVE APPROACH
@Component({
     selector: 'app-login-reactive',
      imports: [ReactiveFormsModule], // as opposed to FormsModule
  templateUrl: './login.reactive.component.html',
     styleUrl: './login.reactive.component.scss',
})
export class LoginReactiveComponent {
  form = new FormGroup({
    email: new FormControl('', { // initial values optional
      // can set validators directly as an Array[]. Obj{} config optional for extra props
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { // validators are not executed when passed
      // minLength is executed as its a factory Fn that returns a validator
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });


  onSubmit() {
    console.log(this.form);
    const { email, password } = this.form.value; // reactive forms offer better TS support
    console.log('email', email, 'password', password);
  }
}
