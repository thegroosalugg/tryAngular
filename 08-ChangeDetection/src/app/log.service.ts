import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogService {
  get viewPing() {
    // getter returns a function that can take an argument
    return (component: string) => {
      console.log(`[${component}] re-evaluated!`);
      return `${component} Debug Output`;
    };
  }
}
