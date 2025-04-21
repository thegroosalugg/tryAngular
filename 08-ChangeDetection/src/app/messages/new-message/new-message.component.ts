import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogService } from 'app/log.service';
import { MessagesService } from '../messages.service';

@Component({
         selector: 'app-new-message',
          imports: [FormsModule],
      templateUrl: './new-message.component.html',
         styleUrl: './new-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMessageComponent {
  logger = inject(LogService);
    msgs = inject(MessagesService);
    text = signal('');

  onSubmit() {
    this.msgs.add(this.text());
    this.text.set('');
  }
}
