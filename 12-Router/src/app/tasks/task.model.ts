const rand = () => (Math.random() * 100).toFixed();
export class Task {
       id: string;
   userId: string;
    title: string;
  summary: string;
  dueDate: string;

  constructor({
     userId,
      title,
    summary,
    dueDate,
  }: {
     userId: string;
      title: string;
    summary: string;
    dueDate: string;
  }) {
    this.id      = crypto.randomUUID();
    this.userId  = userId;
    this.title   = title   || 'Task ' + rand();
    this.summary = summary || 'This is a summary of said task';
    this.dueDate = dueDate || new Date().toISOString();
  }
}
