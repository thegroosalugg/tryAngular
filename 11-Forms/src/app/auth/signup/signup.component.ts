import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Role = 'student' | 'teacher' | 'employer' | 'founder' | 'other';

const     validators = [Validators.required];
const      minLength = Validators.minLength(6);
const newFormControl = () => new FormControl('', { validators });

@Component({
     selector: 'app-signup',
      imports: [ReactiveFormsModule], // directives bings to template
  templateUrl: './signup.component.html',
     styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form = new FormGroup({
        email: new FormControl('', { validators: [...validators, Validators.email] }),
    passwords: new FormGroup({ // form controls can also be grouped & nested
             password: new FormControl('', { validators: [...validators, minLength] }),
      confirmPassword: new FormControl('', { validators: [...validators, minLength] }),
    }),                                    // DRY - validators declared up top
    fullName: new FormGroup({
      // more DRY, outsource: new FormControl('', { validators: [Validators.required] });
      firstName: newFormControl(),
       lastName: newFormControl(),
    }),
    address: new FormGroup({
        street: newFormControl(),
        number: newFormControl(),
      postCode: newFormControl(),
          city: newFormControl(),
    }),
    // no required validators as defaultValue selected
    role: new FormControl<Role>('student'),
  });

  private markSubmitted(formGroup: FormGroup) {
    for (const field in formGroup.controls) {
      const control = formGroup.get(field);
      control?.markAsTouched();
      control?.markAsDirty();

      // when control is a nested formGroup, recall this function...
      // ...and pass the nested prop until loop complete
      if (control instanceof FormGroup) {
        this.markSubmitted(control);
      }
    }
  }

  onSubmit() {
    // console.log(this.form);
    this.markSubmitted(this.form);

    if (this.form.invalid) {
      console.log('Invalid');
      return;
    }

    this.form.reset();
  }
}
