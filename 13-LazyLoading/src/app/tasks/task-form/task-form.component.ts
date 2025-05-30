import { Component, input, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { Router, RouterLink } from '@angular/router';

@Component({
     selector: 'app-task-form',
      imports: [FormsModule, RouterLink],
  templateUrl: './task-form.component.html',
     styleUrl: './task-form.component.scss'
})

export class TaskFormComponent {
     userId = input.required<string>();
      title = signal('');
    summary = signal('');
    dueDate = signal('');
  submitted = signal(false);
  private tasks  = inject(TasksService);
  private router = inject(Router);

  private clearForm() {
    this.title.set('');
    this.summary.set('');
    this.dueDate.set('');
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
    this.submitted.set(true);
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}
