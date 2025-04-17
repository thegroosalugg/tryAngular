import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
     selector: 'app-control',
      imports: [],
  templateUrl: './control.component.html',
     styleUrl: './control.component.scss',
// encapsulation: ViewEncapsulation.None // disables component isolation: ->
// ... so that styles here affect components rendered with <ng-content select=".control" />
// disables :host -> use <app-control class="control" /> instead and select with ng-content
// host: { class: 'control' }, // DRY: sets defined k/v pairs to host element
})
export class ControlComponent {
  label = input.required<string>(); // do not use native HTML prop names like id/name
   rows = input<number>();
}
