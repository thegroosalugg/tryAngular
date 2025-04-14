import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
// import { RouterOutlet } from '@angular/router';

@Component({
     selector: 'app-root',
      imports: [HeaderComponent, FormComponent, TableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = '03-InvestmentCalculator';
}
