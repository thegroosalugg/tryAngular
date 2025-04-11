import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from 'app/modal/modal.service';
import { Task } from 'models/Task';
import { User } from 'models/User';

@Component({
     selector: 'app-task-form',
      imports: [FormsModule],
  templateUrl: './task-form.component.html',
     styleUrl: './task-form.component.scss'
})

export class TaskFormComponent {
      title = signal('');
    summary = signal('');
    dueDate = signal('');
       user = input.required<User>();
      tasks = input.required<Task[]>();
    newTask = output<Task>();

  constructor(private modal: ModalService) {}

  private clearForm() {
    this.title.set('');
    this.summary.set('');
    this.dueDate.set('');
  }

  closeModal() {
    this.modal.toggle(false);
  }

  onSubmit() {
    // e.preventDefault(); // not required with Angular. FormModule handles it.
    const task = new Task({
       userId: this.user().id,
        title: this.title(),
      summary: this.summary(),
      dueDate: this.dueDate(),
    });

    this.clearForm();
    this.newTask.emit(task); // only components that create the signal can update it
    this.closeModal(); // close modal
  }
}
