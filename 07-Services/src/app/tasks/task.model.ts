const rand = () => (Math.random() * 100).toFixed();

export type TaskStatus = 'open' | 'in_progress' | 'done';

export class Task {
      id: string;
   title: string;
    desc: string;
  status: TaskStatus;

  constructor(title: string, desc: string) {
    this.id     = crypto.randomUUID();
    this.title  = title || 'Task' + rand();
    this.desc   = desc  || `lotto ${rand()}, ${rand()}, ${rand()}`;
    this.status = 'open'
  }
}
