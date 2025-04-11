import { Injectable, signal } from '@angular/core';
import { TASKS } from 'data/tasks';
import { Task } from 'models/Task';

// allows class to be injected into other classes.
// providedIn root allows it to be used in whole app
@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<Task[]>(TASKS);

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  private save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  add(task: Task) {
    this.tasks.update((prev) => [task, ...prev]);
    this.save();
  }

  remove(task: Task) {
    const update = this.tasks().filter(({ id }) => id !== task.id); // remove completed tasks
    this.tasks.set(update);
    this.save();
  }

  byUser(userId: string) {
    return this.tasks().filter((task) => task.userId === userId);
  }
}
