import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<Task[]>([]);

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) this.tasks.set(JSON.parse(tasks));
  }

  private save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  add(title: string, desc: string) {
    const task = new Task(title, desc);
    this.tasks.update((prev) => [task, ...prev]);
    this.save();
  }

  updateStatus(taskId: string, _status: string) {
    const status = _status as TaskStatus;
    this.tasks.update((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
    this.save();
  }
}
