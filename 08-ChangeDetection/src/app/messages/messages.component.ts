import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { LogService } from 'app/log.service';

@Component({
         selector: 'app-messages',
      templateUrl: './messages.component.html',
         styleUrl: './messages.component.scss',
          imports: [MessagesListComponent, NewMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  logger = inject(LogService);
}
