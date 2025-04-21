import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LogService } from 'app/log.service';

@Component({
         selector: 'app-messages-list',
      templateUrl: './messages-list.component.html',
         styleUrl: './messages-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {
    logger = inject(LogService);
  messages = input.required<string[]>();
}
