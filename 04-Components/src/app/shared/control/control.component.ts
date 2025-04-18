import { Component, ElementRef, input, ViewEncapsulation } from '@angular/core';

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
  // Angular feature to inject a reference to the host DOM element of the component
  constructor (private element: ElementRef) {}

  onClick() {
    console.log('Bind events to host!', this.element);
    // scroll element into view on click
    this.element.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
