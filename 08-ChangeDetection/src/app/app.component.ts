import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { MessagesComponent } from './messages/messages.component';
import { LogService } from './log.service';

@Component({
         selector: 'app-root',
          imports: [CounterComponent, MessagesComponent],
      templateUrl: './app.component.html',
         styleUrl: './app.component.scss',
  // *OnPush: limits change detection to this component and its children
  changeDetection: ChangeDetectionStrategy.OnPush // (manual | input value | events) changes
})

export class AppComponent {
  logger = inject(LogService);
}
