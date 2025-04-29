import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

// *TEMPLATE DRIVEN APPROACH
@Component({
     selector: 'app-login-template',
      imports: [FormsModule],
  templateUrl: './login.template.component.html',
     styleUrl: './login.template.component.scss',
})
export class LoginTemplateComponent {
  form = viewChild.required<NgForm>('form'); // capture ngForm with #form #templateVar
  private destroyRef = inject(DestroyRef);

  constructor() {
    // afterNextRender() defers execution until after the component has rendered once
    afterNextRender(() => {
      const savedData = localStorage.getItem('form-data');

      if (savedData) {
        const { email } = JSON.parse(savedData);
        // timeout required: though <Form> is initialised, its children controls are not yet in this lifecycle
        setTimeout(() => {
          this.form().controls['email'].setValue(email);
          // this.form().setValue({ email: '', password: '' }); // when changing multiple values
        }, 1);
      }

      const subscription = this.form() // valueChanges is an Observable and can be subscribed to
        .valueChanges?.pipe(debounceTime(500)) // debounceTime piped - better performance
        .subscribe({
          next: (value) =>
            localStorage.setItem(
              'form-data',
              JSON.stringify({ email: value.email })
            ),
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  isInvalid(field: 'email' | 'password') {
    // Template forms must wait for viewInit before we can access any form props
    const { touched, dirty, invalid } = this.form().controls[field] ?? {};
    return touched && dirty && invalid;
  }

  onSubmit(ngForm: NgForm) {
    for (const field in ngForm.controls) {
      const control = ngForm.controls[field];
      control.markAsTouched();
      control.markAsDirty();
    }

    if (ngForm.invalid) {
      console.log('Invalid');
      return;
    }

    const { email, password } = ngForm.controls;
    console.log('EMAIL:', email.value, 'PASSWORD', password.value);
    ngForm.form.reset();
  }
}
