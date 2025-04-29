import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { LoginTemplateComponent } from './auth/login-template-driven/login.template.component';
import { LoginReactiveComponent } from './auth/login-reactive/login.reactive.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgComponentOutlet } from '@angular/common';

type CustomComponent =
  | typeof LoginTemplateComponent
  | typeof LoginReactiveComponent
  | typeof SignupComponent;

@Component({
     selector: 'app-root',
      imports: [NgComponentOutlet],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss',
})
export class AppComponent {
       title = '11-Forms';
       forms = signal(['Login-Template', 'Login-Reactive', 'SignUp-Reactive']);
   component = signal<CustomComponent>(LoginTemplateComponent);
  components = signal([
    LoginTemplateComponent,
    LoginReactiveComponent,
    SignupComponent,
  ]);

  switch(index: number) {
    this.component.set(this.components()[index]);
  }
}
