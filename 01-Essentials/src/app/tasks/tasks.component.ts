import { Component, computed, input } from '@angular/core';
import { User } from '../models/User';
import { TASKS } from '../../data/tasks';

@Component({
     selector: 'app-tasks',
      imports: [],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss'
})

export class TasksComponent {
  user  = input.required<User>();
  tasks = TASKS
  userTasks = computed(() => this.tasks.filter(task => task.userId === this.user().id));
}
