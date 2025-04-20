import { computed, Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks          = signal<Task[]>([]);
  task           = signal<Task>(new Task('', ''));
  selectedFilter = signal<string>('all');
  taskStatus     = computed(() =>
    ({
             open: 'Open',
      in_progress: 'Working on it',
             done: 'Completed',
    }[this.task().status])
  );

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  onChangeTaskStatus(taskId: string, status: string) {}

}
