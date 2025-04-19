const rand = () => +(Math.random() * 100).toFixed();
export class Ticket {
       id: string;
    title: string;
  request: string;
   isOpen: boolean;

  constructor(title: string, request: string) {
    this.id      = crypto.randomUUID();
    this.title   = title   || 'ticket: ' + rand();
    this.request = request || `Winning numbers: ${rand()}, ${rand()}, ${rand()}`;
    this.isOpen  = true;
  }
}
