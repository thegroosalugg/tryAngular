import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

// custom validator: receives control as an arg
function mustIncludeSpecialChars(control: AbstractControl) {
  // basic special characters experession
  if (/[!@#$%^&*()-_=+]+/.test(control.value)) return null; // when valid, must return null
  return { noSpecialChars: true }; // when invalid, return an errors object, like found in controls
}

// asyncValidators must return an observable and import 'of' from RxJS
function isUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') return of(null);
  return of({ notUnique: true }); // returns an observable that emits the value
}

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
      asyncValidators: [isUnique]
    }),
    password: new FormControl('', { // validators are not executed when passed
      // minLength is executed as its a factory Fn that returns a validator
      validators: [Validators.required, Validators.minLength(6), mustIncludeSpecialChars],
    }),
  });

  isValid(field: 'email' | 'password') {
    const { touched, dirty, invalid } = this.form.controls[field];
    return touched && dirty && invalid;
  }

  onSubmit() {
    // mark controls as touched & dirty on submission -> fixes blank form submits
    for (const field in this.form.controls) {
      const control = this.form.get(field);
      control?.markAsTouched();
      control?.markAsDirty();
    }

    console.log(this.form);
    const { email, password } = this.form.value; // reactive forms offer better TS support
    console.log('email', email, 'password', password);
  }
}
