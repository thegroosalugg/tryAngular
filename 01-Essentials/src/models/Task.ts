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
    this.title   = title;
    this.summary = summary;
    this.dueDate = dueDate;
  }
}
