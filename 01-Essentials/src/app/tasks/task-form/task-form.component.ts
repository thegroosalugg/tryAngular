import { Component, input, output } from '@angular/core';

@Component({
     selector: 'app-task-form',
      imports: [],
  templateUrl: './task-form.component.html',
     styleUrl: './task-form.component.scss'
})

export class TaskFormComponent {
  toggleOff = output<boolean>();

  emitToggleOff() {
    console.log('Tasks-Form: close modal');
    this.toggleOff.emit(false);
  }
}
