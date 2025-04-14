import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculateInvestmentResults } from 'util/investment-results';

@Component({
     selector: 'app-form',
      imports: [FormsModule],
  templateUrl: './form.component.html',
     styleUrl: './form.component.scss',
})

export class FormComponent {
  initialInvestment = signal(0);
  annualInvestment  = signal(0);
  expectedReturn    = signal(0);
  duration          = signal(0);

  onSubmit() {
    const results = calculateInvestmentResults({
      initialInvestment: this.initialInvestment(),
       annualInvestment: this.annualInvestment(),
         expectedReturn: this.expectedReturn(),
               duration: this.duration(),
    });
    console.log(results);
  }
}
