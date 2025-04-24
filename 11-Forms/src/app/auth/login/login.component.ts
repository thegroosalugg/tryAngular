import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// *TEMPLATE DRIVEN APPROACH
@Component({
     selector: 'app-login',
      imports: [FormsModule],
  templateUrl: './login.component.html',
     styleUrl: './login.component.scss',
})
export class LoginComponent {
  onSubmit(ngForm: NgForm) {
    const { email, password } = ngForm.controls;
    // console.dir(ngForm);
    console.log(email);
    console.log(password);
    // console.log(email.status);
    // console.log(password.status);
  }
}
