import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
     selector: 'app-input',
      imports: [FormsModule],
  templateUrl: './input.component.html',
     styleUrl: './input.component.scss'
})
export class InputComponent {
  id      = input.required<string>();
  bindVal = model.required<number>(); // allows to pass a signal from parent
}
