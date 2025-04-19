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
  displayState = signal<Record<string, boolean>>({});

  constructor() {
    const tickets = localStorage.getItem('tickets');
    if (tickets) this.tickets.set(JSON.parse(tickets));
  }

  private save() {
    localStorage.setItem('tickets', JSON.stringify(this.tickets()));
  }

  toggleDisplay(id: string) {
    this.displayState.update((prevState) => ({
      ...prevState,
              [id]: !prevState[id], // !toggle open state of selected list item
    }));
  }

  closeTicket(ticketId: string) {
    this.tickets.update((prevState) => {
      const index = prevState.findIndex(({ id }) => id === ticketId);
      if (index >= 0) prevState[index].isOpen = false;
      return prevState;
    });
    this.save();
  }

  onAdd(ticket: Ticket) {
    this.tickets.update((prev) => [ticket, ...prev]);
    this.save();
  }
}
