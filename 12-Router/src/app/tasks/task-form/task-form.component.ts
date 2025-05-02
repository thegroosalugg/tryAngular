import { Component, input, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { ModalService } from 'app/modal/modal.service';
import { ModalComponent } from 'app/modal/modal.component';

@Component({
     selector: 'app-task-form',
      imports: [FormsModule, ModalComponent],
  templateUrl: './task-form.component.html',
     styleUrl: './task-form.component.scss'
})

export class TaskFormComponent {
   userId = input.required<string>();
    title = signal('');
  summary = signal('');
  dueDate = signal('');
  private modal = inject(ModalService);
  private tasks = inject(TasksService);

  private clearForm() {
    this.title.set('');
    this.summary.set('');
    this.dueDate.set('');
  }

  closeModal() {
    this.modal.close();
  }

  onSubmit() {
    const task = new Task({
       userId: this.userId(),
        title: this.title(),
      summary: this.summary(),
      dueDate: this.dueDate(),
    });

    this.clearForm();
    this.tasks.add(task);
    this.closeModal();
  }
}
