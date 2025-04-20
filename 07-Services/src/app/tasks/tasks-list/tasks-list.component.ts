import { Component, computed, signal } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TaskStatus } from '../task.model';

@Component({
     selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
     styleUrl: './tasks-list.component.scss',
      imports: [TaskItemComponent],
})
export class TasksListComponent {
  constructor(public tasks: TasksService) {}

  _filter  = signal<TaskStatus | undefined>(undefined);
  filtered = computed(() => {
    const tasks = this.tasks.tasks()
    if (!this._filter()) return tasks;
    return tasks.filter((task) => task.status === this._filter());
  });

  changeFilter(filter: string) {
    this._filter.set(filter as TaskStatus);
  }
}
