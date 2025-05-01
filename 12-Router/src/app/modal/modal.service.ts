import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
     isOpen = signal(false);
  isClosing = signal(false);

  toggle(shouldOpen: boolean) {
    if (shouldOpen) {
      this.isOpen.set(true);
    } else {
      this.isClosing.set(true);

      setTimeout(() => {
        this.isClosing.set(false); // end animation
        this.isOpen.set(false); // close modal
      }, 500); // matches animation duration
    }
  }
}
