import { Injectable, signal } from '@angular/core';
import { ModalService } from '../modal.service';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private _error = signal('');
  error = this._error.asReadonly();

  constructor(private modal: ModalService) {
    this.modal.onClose.set(() => this._error.set('')); // clear error when modal closes
  }

  popUp(err: string) {
    this._error.set(err); // components producing errors inject this function...
    this.modal.open(); // and this opens modal on error
  }

  clear() {
    this.modal.close(); // close will trigger above callback to clear error
  }
}
