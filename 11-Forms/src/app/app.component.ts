import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { LoginTemplateComponent } from './auth/login-template-driven/login.template.component';
import { LoginReactiveComponent } from './auth/login-reactive/login.reactive.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgComponentOutlet } from '@angular/common';

const components = [
  LoginTemplateComponent,
  LoginReactiveComponent,
  SignupComponent,
];

@Component({
     selector: 'app-root',
      imports: [NgComponentOutlet],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss',
})
export class AppComponent {
      title = '11-Forms';
      forms = signal(['Login-Template', 'Login-Reactive', 'SignUp-Reactive']);
  component = signal(components[2]);

  switch(index: number) {
    this.component.set(components[index]);
  }
}
