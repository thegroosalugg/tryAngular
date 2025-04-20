import { computed, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  all       = signal<Task[]>([]);
  filtered  = signal<string>('all');

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) this.all.set(JSON.parse(tasks));
  }

  private save() {
    localStorage.setItem('tasks', JSON.stringify(this.all()));
  }

  add(title: string, desc: string) {
    const task = new Task(title, desc);
    this.all.update((prev) => [task, ...prev]);
    this.save();
  }

  changeFilter(filter: string) {
    this.filtered.set(filter);
  }

  updateStatus(taskId: string, _status: string) {
    const status = _status as TaskStatus;
    this.all.update((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
    this.save();
  }
}
