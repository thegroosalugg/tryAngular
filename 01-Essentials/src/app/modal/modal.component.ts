import { Component, input, output, signal } from '@angular/core';

@Component({
     selector: 'app-modal',
      imports: [],
  templateUrl: './modal.component.html',
     styleUrl: './modal.component.scss'
})

export class ModalComponent {
     isOpen = input.required<boolean>(); // set by parent
  isClosing = input.required<boolean>(); // tracks closing animation state
  toggleOff = output<boolean>();         // signal to parent to close the modal

  emitToggleOff() {
    console.log('Modal: close modal');
    this.toggleOff.emit(false);
  }
}
