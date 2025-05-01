import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModalService } from 'app/modal/modal.service';
import { TasksService } from './tasks.service';
import { User } from 'app/users/user.model';
import { Task } from './task.model';

@Component({
     selector: 'app-tasks',
      imports: [DatePipe],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})

export class TasksComponent {
  user = input.required<User>(); 

  constructor(private modal: ModalService, private tasks: TasksService) {}

  userTasks = computed(() => this.tasks.byUser(this.user().id));

  markCompleted(task: Task) {
    this.tasks.remove(task);
  }

  openModal() {
    this.modal.toggle(true);
  }
}
