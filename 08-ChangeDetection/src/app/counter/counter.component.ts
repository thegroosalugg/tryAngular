import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';
import { LogService } from '../log.service';
@Component({
         selector: 'app-counter',
      templateUrl: './counter.component.html',
         styleUrl: './counter.component.scss',
          imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  logger = inject(LogService);
   count = signal(0);

  ngOnInit() {
    setTimeout(() => this.count.set(666), 2000);
  }

  setCount(n: number) {
    this.count.update((prev) => prev + n);
    // this.count += n; // testing zone.js
  }
}
