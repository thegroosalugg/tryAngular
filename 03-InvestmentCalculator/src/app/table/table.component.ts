import { Component, input } from '@angular/core';
import { Investment } from 'util/investment-results';

@Component({
     selector: 'app-table',
      imports: [],
  templateUrl: './table.component.html',
     styleUrl: './table.component.scss'
})
export class TableComponent {
  tData = input.required<Investment[]>();
}
