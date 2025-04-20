import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
     selector: 'app-root',
      imports: [CounterComponent, MessagesComponent],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})


export class AppComponent {
  get debugOutput() {
    console.log('[AppComponent] "debugOutput" binding re-evaluated');
    return 'AppComponent Component Debug Output';
  }
}
