import { Component, inject } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal.component';

@Component({
     selector: 'app-error-modal',
      imports: [ModalComponent],
  templateUrl: './error.component.html',
     styleUrl: './error.component.scss'
})
export class ErrorComponent {
  public modal = inject(ModalService);
}
