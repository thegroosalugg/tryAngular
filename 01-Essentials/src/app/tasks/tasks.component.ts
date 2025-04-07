import { Component, computed, input } from '@angular/core';
import { User } from '../models/User';
import { Task } from '../models/Task';

@Component({
     selector: 'app-tasks',
      imports: [],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  user  = input.required<User>();
  tasks = input.required<Task[]>();

  userTasks = computed(() =>
    this.tasks().filter((task) => task.userId === this.user().id)
  );
}
