import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogService } from 'app/log.service';

@Component({
         selector: 'app-new-message',
          imports: [FormsModule],
      templateUrl: './new-message.component.html',
         styleUrl: './new-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMessageComponent {
  logger = inject(LogService);
     add = output<string>();
    text = signal('');

  onSubmit() {
    this.add.emit(this.text());
    this.text.set('');
  }
}
