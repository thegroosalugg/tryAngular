import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';
import { TableComponent } from "../table/table.component";

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
      imports: [TableComponent, ReactiveFormsModule], // as opposed to FormsModule
  templateUrl: './login.reactive.component.html',
     styleUrl: './login.reactive.component.scss',
})
export class LoginReactiveComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
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

  // reactiveForms can use ngOnInit as the form is initialised immediately, not after template has rendered
  ngOnInit() {
    const savedData = localStorage.getItem('form-data');

    if (savedData) {
      const { email } = JSON.parse(savedData);
      this.form.patchValue({ email }); // patchValue is an alternative offered by FormControl
    } // allows to change 1 or multiple form values

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) =>
          localStorage.setItem(
            'form-data',
            JSON.stringify({ email: value.email })
          ),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  isInvalid(field: 'email' | 'password') {
    // Reactive forms do not need to wait for viewInit as the form is already defined
    const { touched, dirty, invalid } = this.form.controls[field];
    return touched && dirty && invalid;
  }

  onSubmit() {
    console.clear();
    console.log(this.form.value);
    // mark controls as touched & dirty on submission -> fixes blank form submits
    for (const field in this.form.controls) {
      const control = this.form.get(field);
      control?.markAsTouched();
      control?.markAsDirty();
    }

    if (this.form.invalid) {
      console.log('Invalid');
      return;
    }

    const { email, password } = this.form.value; // reactive forms offer better TS support
    console.log('Success! \n Email', email, '\n Password', password);
    this.form.reset();
  }
}
