import { Component, inject } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ErrorService } from './error.service';

@Component({
     selector: 'app-error-modal',
      imports: [ModalComponent],
  templateUrl: './error.component.html',
     styleUrl: './error.component.scss'
})
export class ErrorComponent {
  public err = inject(ErrorService);
}
