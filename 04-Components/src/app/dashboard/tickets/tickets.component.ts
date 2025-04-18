import { Component, signal } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.model';

@Component({
     selector: 'app-tickets',
      imports: [NewTicketComponent],
  templateUrl: './tickets.component.html',
     styleUrl: './tickets.component.scss'
})

export class TicketsComponent {
    tickets = signal<Ticket[]>([]);
  isVisible = signal(false);

  toggleDisplay() {
    this.isVisible.update(wasVisible => !wasVisible);
  }

  onAdd(ticket: Ticket) {
    this.tickets.update((prev) => [ticket, ...prev]);
  }
}
