import { Component } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
     selector: 'app-modal',
      imports: [],
  templateUrl: './modal.component.html',
     styleUrl: './modal.component.scss'
})

export class ModalComponent {
  constructor(public modal: ModalService) {}
}
