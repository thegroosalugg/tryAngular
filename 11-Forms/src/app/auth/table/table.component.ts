import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
     selector: 'app-table',
      imports: [CommonModule],
  templateUrl: './table.component.html',
     styleUrl: './table.component.scss',
})
export class TableComponent {
      form = input.required<FormGroup>();
  controls = computed(() => Object.keys(this.form().controls));
  statuses = [
        'dirty',
     'pristine',
      'touched',
    'untouched',
        'valid',
      'invalid',
       'errors',
  ] as const;
}
