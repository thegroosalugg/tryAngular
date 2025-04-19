import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NavService {
  isTesting = signal(false);

  toggle() {
    console.clear();
    this.isTesting.set(!this.isTesting());
  }
}
