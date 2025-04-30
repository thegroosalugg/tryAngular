import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Role = 'student' | 'teacher' | 'employer' | 'founder' | 'other';

const     validators = [Validators.required, Validators.minLength(6)] // for passwords
const newFormControl = () => new FormControl('', { validators: [Validators.required] });
// create factory function that receives generic input names and returns validator Fn
const equalValues = (first: string, second: string) => {
  return (control: AbstractControl) => {
    const  firstVal = control.get(first)?.value; // get control by name
    const secondVal = control.get(second)?.value;
    if (firstVal === secondVal) return null; // valid returns null
    return { valuesNotEqual: true }; // invalid returns error object
  };
};

@Component({
     selector: 'app-signup',
      imports: [ReactiveFormsModule], // directives binds to template
  templateUrl: './signup.component.html',
     styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup(
      { // form controls can also be grouped & nested
               password: new FormControl('', { validators }), // DRY: validators up top
        confirmPassword: new FormControl('', { validators }),
      }, // FormGroups can also receive validators to validate all controls in the group
      // Note: ng-invalid etc will now be applied to the Group Div, not the Controls
      { validators: [equalValues('password', 'confirmPassword')] }
    ),
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
    // requires true boolean - where as required wants non null, and false is non-nullish
    terms: new FormControl(false, { validators: [Validators.requiredTrue] }),
    // expects an Array of new FormControl(defaultValue) per checkbox
    source: new FormArray(
      Array.from({ length: 3 }, () => new FormControl(false))
    ),
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
    console.clear();
    console.log(this.form.value);
    this.markSubmitted(this.form);

    if (this.form.invalid) {
      console.log('Invalid');
      return;
    }

    this.form.reset();
  }
}
