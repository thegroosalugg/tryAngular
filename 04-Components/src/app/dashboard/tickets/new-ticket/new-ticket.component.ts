import { Component } from '@angular/core';
import { ButtonComponent } from 'app/shared/button/button.component';

@Component({
     selector: 'app-new-ticket',
      imports: [ButtonComponent],
  templateUrl: './new-ticket.component.html',
     styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent {}
