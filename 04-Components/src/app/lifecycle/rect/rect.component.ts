import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
     selector: 'app-rect',
      imports: [],
  templateUrl: './rect.component.html',
     styleUrl: './rect.component.scss',
})
export class RectComponent {
  // 2-way binding with @Decorators requires combined @Input with @Output
  // @Input({ required: true }) size!: { width: number, height: number };
  // reserved @Output name: @Input name + 'Change' ensures 2-way binding
  // @Output() sizeChange = new EventEmitter();
  size = model.required<{ width: number, height: number }>(); // easier with signals

  onReset() {
    this.size.set({ width: 200, height: 200 });
    // this.sizeChange.emit({ width: 200, height: 200 });
  }
}
