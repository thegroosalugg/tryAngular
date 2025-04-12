import { Injectable, signal } from '@angular/core';

// allows class to be injected into other classes.
// providedIn root allows it to be used in whole app
@Injectable({ providedIn: 'root' })
export class ModalService {
     isOpen = signal(false); // modal open state
  isClosing = signal(false); // tracks <Modal/> closing (animation) state

  toggle(shouldOpen: boolean) {
    if (shouldOpen) {
      this.isOpen.set(true);
    } else {
      this.isClosing.set(true); // start animation
      // Wait for animation to complete before emitting close event
      setTimeout(() => {
        this.isClosing.set(false); // end animation
        this.isOpen.set(false); // close modal
      }, 500); // matches animation duration
    }
  }
}
