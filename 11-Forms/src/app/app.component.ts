import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { LoginTemplateComponent } from './auth/login-template-driven/login.template.component';
import { LoginReactiveComponent } from "./auth/login-reactive/login.reactive.component";

const imports = [
  // LoginTemplateComponent,
  LoginReactiveComponent,
];

@Component({
     selector: 'app-root',
      imports,
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '11-Forms';
}
