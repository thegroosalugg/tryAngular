import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModalService } from 'app/modal/modal.service';
import { TasksService } from './tasks.service';
import { UsersService } from 'app/users/users.service';
import { Task } from './task.model';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
     selector: 'app-tasks',
      imports: [DatePipe, TaskFormComponent],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})

export class TasksComponent {
  userId = input.required<string>(); // received via URL - names must match routes/:id
  private users = inject(UsersService);
  private tasks = inject(TasksService);
  private modal = inject(ModalService);
  showModal = this.modal.isOpen;

  userTasks = computed(() => this.tasks.byUser(this.userId()));
  userName = computed(() => this.users.find(this.userId())?.name);

  markCompleted(task: Task) {
    this.tasks.remove(task);
  }

  openModal() {
    this.modal.open();
  }
}
