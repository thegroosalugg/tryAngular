import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { calculateInvestment, Investment } from 'util/investment-results';

@Component({
     selector: 'app-form',
      imports: [FormsModule, InputComponent],
  templateUrl: './form.component.html',
     styleUrl: './form.component.scss',
})

export class FormComponent {
  initialInvestment = signal(0);
  annualInvestment  = signal(0);
  expectedReturn    = signal(5);
  duration          = signal(10);
  formSubmit        = output<Investment[]>();

  onSubmit() {
    const results = calculateInvestment({
      initialInvestment: this.initialInvestment(),
       annualInvestment: this.annualInvestment(),
         expectedReturn: this.expectedReturn(),
               duration: this.duration(),
    });
    this.formSubmit.emit(results);
  }
}
