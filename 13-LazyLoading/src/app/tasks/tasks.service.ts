import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

export const TASKS = [
  {
         id: 't1',
     userId: 'u1',
      title: 'Master Angular',
    summary:
      'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: '2025-12-31',
  },
  {
         id: 't2',
     userId: 'u3',
      title: 'Build first prototype',
    summary: 'Build a first prototype of the online shop website',
    dueDate: '2024-05-31',
  },
  {
         id: 't3',
     userId: 'u3',
      title: 'Prepare issue template',
    summary:
      'Prepare and describe an issue template which will help with project management',
    dueDate: '2024-06-15',
  },
]

@Injectable() // injected in user routes
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
    const update = this.tasks().filter(({ id }) => id !== task.id);
    this.tasks.set(update);
    this.save();
  }

  byUser(userId: string) {
    return this.tasks().filter((task) => task.userId === userId);
  }
}
