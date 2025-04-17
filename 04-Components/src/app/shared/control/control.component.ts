import { Component, input } from '@angular/core';

@Component({
     selector: 'app-control',
      imports: [],
  templateUrl: './control.component.html',
     styleUrl: './control.component.scss'
})
export class ControlComponent {
  label = input.required<string>(); // do not use native HTML prop names like id/name
   rows = input<number>();
}
