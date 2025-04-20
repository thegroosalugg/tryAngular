import { Component, computed, inject, Inject, signal } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TaskStatus } from '../task.model';
import { TaskInjectorTkn } from 'app/app.config';

@Component({
     selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
     styleUrl: './tasks-list.component.scss',
      imports: [TaskItemComponent],
})
export class TasksListComponent {
  constructor(public tasks: TasksService) {}
  // 4* Custom Injector Tokens
  // constructor(@Inject(TaskInjectorTkn) private tasks: TasksService) {}
  // tasks = inject(TaskInjectorTkn); // 4* or inject Token instead of service with inject()

  _filter  = signal<TaskStatus | ''>('');
  filtered = computed(() => {
    const tasks = this.tasks.tasks()
    if (!this._filter()) return tasks;
    return tasks.filter((task) => task.status === this._filter());
  });

  changeFilter(filter: string) {
    // checks filter is valid or empty string sets filter to none
    if (!this.tasks.isTaskStatus(filter) && filter !== '') return;
    this._filter.set(filter);
  }
}
