import { Component, input, output, signal } from '@angular/core';

@Component({
     selector: 'app-modal',
      imports: [],
  templateUrl: './modal.component.html',
     styleUrl: './modal.component.scss'
})

export class ModalComponent {
  open      = input<boolean>();
  close     = output<boolean>();
  isClosing = signal(false); // signal tracks closing (animation) state

  closeModal() {
    console.log('close modal');
    this.isClosing.set(true); // start animation

    // Wait for animation to complete before emitting close event
    setTimeout(() => {
      this.isClosing.set(false); // end animation
      this.close.emit(false); // emit to parent that modal is closed
    }, 500); // matches animation duration
  }
}
