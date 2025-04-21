import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  // private messages = signal<string[]>([]); // signal
  // all = this.messages.asReadonly(); // signal
  private messages: string[] = []; // zone.js
  messages$ = new BehaviorSubject<string[]>([]); // rxjs sets up manual change detection
  get all() { return this.messages } // zone.js

  add(message: string) {
    // this.messages.update((prev) => [message, ...prev]); // signal
    this.messages = [message, ...this.messages]; // zone.js
    this.messages$.next(this.messages); // rxjs emits change to components listening
  }
}
