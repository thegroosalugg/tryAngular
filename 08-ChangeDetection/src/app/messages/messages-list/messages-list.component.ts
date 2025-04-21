import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { LogService } from 'app/log.service';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
         selector: 'app-messages-list',
          imports: [AsyncPipe], // *handles all of the below rxjs subscriptions
      templateUrl: './messages-list.component.html',
         styleUrl: './messages-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class MessagesListComponent implements OnInit {
export class MessagesListComponent {
  logger = inject(LogService);
    msgs = inject(MessagesService);
  // **@Decorator based Reactive Change Detection (AsyncPipe under the hood)
  // private   cdRef = inject(ChangeDetectorRef);
  // private dstrRef = inject(DestroyRef);
  // messages: string[] = []; // local state created when listening for manual detection

  // ngOnInit() { // rxjs BehaviourSubject can subscribe to emitted changes
  //   const subscription = this.msgs.messages$.subscribe((messages) => {
  //     this.messages = messages; // overwrites local state
  //     this.cdRef.markForCheck(); // manually triggers check in OnPush components
  //   });
  //   this.dstrRef.onDestroy(() => subscription.unsubscribe()); // clean up
  // }
}
