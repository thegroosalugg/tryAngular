import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NavService {
  isTesting = signal(false);

  toggle() {
    this.isTesting.set(!this.isTesting());
  }
}
