import { Component } from '@angular/core';
import { ButtonComponent } from 'app/shared/button/button.component';
import { ControlComponent } from 'app/shared/control/control.component';

@Component({
     selector: 'app-new-ticket',
      imports: [ButtonComponent, ControlComponent],
  templateUrl: './new-ticket.component.html',
     styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent {}
