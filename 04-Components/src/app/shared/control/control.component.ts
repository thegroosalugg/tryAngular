import { Component, computed, ElementRef, input, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
     selector: 'app-control',
      imports: [],
  templateUrl: './control.component.html',
     styleUrl: './control.component.scss',
// encapsulation: ViewEncapsulation.None // disables component isolation: ->
// ... so that styles here affect components rendered with <ng-content select=".control" />
// disables :host -> use <app-control class="control" /> instead and select with ng-content
         host: {
           // class: 'control',   // DRY: sets defined k/v pairs to host element
          '(click)': 'onClick()', // can also bind events to host
         },
})
export class ControlComponent {
  label = input.required<string>(); // do not use native HTML prop names like id/name
   rows = input<number>();
  // gets all elements that use #input template var - 1 element per component instance
  input = viewChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');
  // Angular feature to inject a reference to the host DOM element of the component
  constructor (private host: ElementRef) {}

  onClick() {
    console.dir(this.host.nativeElement);
    // scroll element into view on click
    this.host.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onChange(event: Event) {
    const { id, value } = event.target as HTMLInputElement;
    console.log(`[${id}]: ${value}`); // one way of reading input values
  }
}
