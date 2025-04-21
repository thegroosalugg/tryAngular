import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private messages = signal<string[]>([]);
  all = this.messages.asReadonly();

  add(message: string) {
    this.messages.update((prev) => [message, ...prev]);
  }
}
