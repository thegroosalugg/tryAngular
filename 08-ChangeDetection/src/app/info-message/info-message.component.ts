import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogService } from 'app/log.service';

@Component({
         selector: 'app-info-message',
          imports: [],
      templateUrl: './info-message.component.html',
         styleUrl: './info-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoMessageComponent {
  logger = inject(LogService);

  onLog() {
    console.log('Clicked!');
  }
}
