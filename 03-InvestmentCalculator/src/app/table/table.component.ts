import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Investment } from 'util/investment-results';

@Component({
     selector: 'app-table',
      imports: [CurrencyPipe],
  templateUrl: './table.component.html',
     styleUrl: './table.component.scss'
})
export class TableComponent {
  tData = input.required<Investment[]>();
}
