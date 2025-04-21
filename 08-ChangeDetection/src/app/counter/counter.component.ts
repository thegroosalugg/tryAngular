import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';
import { LogService } from '../log.service';
@Component({
         selector: 'app-counter',
      templateUrl: './counter.component.html',
         styleUrl: './counter.component.scss',
          imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  logger = inject(LogService);
   count = signal(0);

  setCount(n: number) {
    this.count.update((prev) => prev + n);
  }
}
