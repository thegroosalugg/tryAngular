import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
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
     user = input.required<User>(); // no usersService avoids redundant internal null checks

  constructor(private modal: ModalService, private tasks: TasksService) {}

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
    this.tasks.add(task);
    this.closeModal();
  }
}
