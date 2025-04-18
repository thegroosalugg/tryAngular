import { Component, computed, input } from '@angular/core';
import { User } from 'models/User';
import { Task } from 'models/Task';
import { ModalService } from 'app/modal/modal.service';
import { TasksService } from './tasks.service';

@Component({
     selector: 'app-tasks',
   standalone: false,
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})

export class TasksComponent {
  user = input.required<User>(); // no usersService avoids redundant internal null checks

  constructor(private modal: ModalService, private tasks: TasksService) {}

  userTasks = computed(() => this.tasks.byUser(this.user().id));

  markCompleted(task: Task) {
    this.tasks.remove(task);
  }

  openModal() {
    this.modal.toggle(true);
  }
}
