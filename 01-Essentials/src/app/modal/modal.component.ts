import { Component } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
     selector: 'app-modal',
      imports: [],
  templateUrl: './modal.component.html',
     styleUrl: './modal.component.scss'
})

export class ModalComponent {
  // adding public/private to a constructor shorthands class props initialization
  // No need for this.modal = modal;
  constructor(public modal: ModalService) {}
  // inject(class) is an alternative to the constructor. It does the same thing
  // public modal = inject(ModalService);
}
