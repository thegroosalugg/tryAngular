import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ControlContainer, FormGroup, NgForm } from '@angular/forms';

@Component({
     selector: 'app-table',
      imports: [CommonModule],
  templateUrl: './table.component.html',
     styleUrl: './table.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TableComponent {
  form = input.required<FormGroup | NgForm>();
  statuses = [
    'dirty',
    'pristine',
    'touched',
    'untouched',
    'valid',
    'invalid',
    'errors',
  ] as const;

  controls = computed(() => {
    const controls = this.form().controls
    return Object.keys(controls);
  });
}
