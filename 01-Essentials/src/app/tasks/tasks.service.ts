import { computed, Injectable, signal } from '@angular/core';
import { TASKS } from 'data/tasks';
import { Task } from 'models/Task';

// allows class to be injected into other classes.
// providedIn root allows it to be used in whole app
@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<Task[]>(TASKS);

  add(task: Task) {
    this.tasks.update((prev) => [task, ...prev]);
  }

  remove(task: Task) {
    const update = this.tasks().filter(({ id }) => id !== task.id); // remove completed tasks
    this.tasks.set(update);
  }

  byUser(userId: string) {
    return this.tasks().filter((task) => task.userId === userId);
  }
}
