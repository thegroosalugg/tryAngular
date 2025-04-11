import { Component, computed, input, output } from '@angular/core';
import { User } from 'models/User';
import { Task } from 'models/Task';
import { DatePipe } from '@angular/common';
import { ModalService } from 'app/modal/modal.service';
@Component({
     selector: 'app-tasks',
      imports: [DatePipe],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})

export class TasksComponent {
      user = input.required<User>(); // receive props (Readonly)
     tasks = input.required<Task[]>();
  complete = output<Task>(); // emit event to parent.

  constructor(private modal: ModalService) {}

  userTasks = computed(() =>
    this.tasks().filter((task) => task.userId === this.user().id)
  );

  emitCompleted(task: Task) {
    this.complete.emit(task);
  }

  openModal() {
    this.modal.toggle(true);
  }
}
