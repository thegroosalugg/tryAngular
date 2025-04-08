import { Component, input, output } from '@angular/core';

@Component({
     selector: 'app-modal',
      imports: [],
  templateUrl: './modal.component.html',
     styleUrl: './modal.component.scss'
})

export class ModalComponent {
  open  = input<boolean>();
  close = output<boolean>();

  closeModal() {
    console.log('close modal');
    this.close.emit(false);
  }
}
