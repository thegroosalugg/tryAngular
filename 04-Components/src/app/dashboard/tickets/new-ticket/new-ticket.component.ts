import { Component, ElementRef, output, viewChild, ViewChild, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'app/shared/button/button.component';
import { ControlComponent } from 'app/shared/control/control.component';
import { Ticket } from '../ticket.model';

@Component({
     selector: 'app-new-ticket',
      imports: [FormsModule, ButtonComponent, ControlComponent],
  templateUrl: './new-ticket.component.html',
     styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent {
  // pass #templateVar as arg to ViewChild to get the elementRef
  // allows grabbing of element without manually passing it to events
  // @ViewChild('form') form!: ElementRef<HTMLFormElement>; // @Decarator approach
      form = viewChild.required<ElementRef<HTMLFormElement>>('form'); // signal<> approach
  controls = viewChildren(ControlComponent); // array of custom components
       add = output<Ticket>();

  onSubmit() {
    const data: Record<string, string> = {};

    this.controls().forEach(control => {
      const { nativeElement } = control.input(); // input() is viewChild() value in <ControlComponent />
      const { id, value } = nativeElement;
      data[id] = value; // store any key-value pairs
    })

    const { title, request } = data; // simulate req.body
    const ticket = new Ticket(title, request);
    this.add.emit(ticket);
    this.form().nativeElement.reset(); // nativeElement contains the actual HTML element data
  }
}
