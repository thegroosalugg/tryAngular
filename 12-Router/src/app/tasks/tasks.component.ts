import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModalService } from 'app/modal/modal.service';
import { TasksService } from './tasks.service';
import { UsersService } from 'app/users/users.service';
import { User } from 'app/users/user.model';
import { Task } from './task.model';

@Component({
     selector: 'app-tasks',
      imports: [DatePipe],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})

export class TasksComponent {
  userId = input.required<string>(); // received via URL - names must match routes/:id

  constructor(
    private modal: ModalService,
    private tasks: TasksService,
    private users: UsersService
  ) {}

  userTasks = computed(() => this.tasks.byUser(this.userId()));
  userName = computed(
    () => this.users.users().find(({ id }) => id === this.userId())?.name
  );

  markCompleted(task: Task) {
    this.tasks.remove(task);
  }

  openModal() {
    this.modal.toggle(true);
  }
}
