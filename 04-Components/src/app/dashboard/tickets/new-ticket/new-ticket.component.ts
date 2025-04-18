import { Component, ElementRef, viewChild, ViewChild, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'app/shared/button/button.component';
import { ControlComponent } from 'app/shared/control/control.component';

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

  onSubmit() {
    const data: Record<string, string> = {};

    this.controls().forEach(control => {
      const { nativeElement } = control.input(); // input() is viewChild() value in <ControlComponent>
      const { id, value } = nativeElement;
      data[id] = value
    })

    console.log('[Form Data]:', data);
    this.form().nativeElement.reset(); // nativeElement contains the actual HTML element data
  }
}
