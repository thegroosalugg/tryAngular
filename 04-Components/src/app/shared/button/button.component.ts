import { Component, input } from '@angular/core';

// Extend default HTML elements with custom attributes
@Component({
  // selector: '[custom]' can select any element, adding 'button' restricts it
     selector: 'button[custom]', // can also select classes: 'button.button'
     // and add multiple selectors, separated with comma: , a[custom], 
      imports: [],
  templateUrl: './button.component.html',
     styleUrl: './button.component.scss'
})
export class ButtonComponent {
  icon = input<string>();
}
