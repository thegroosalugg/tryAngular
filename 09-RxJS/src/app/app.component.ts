import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';
// import { RouterOutlet } from '@angular/router';

@Component({
     selector: 'app-root',
      imports: [],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
       title = '09-RxJS';
       count = signal(0);
      count$ = toObservable(this.count); // ***3 Convert signal toObservable
   interval$ = interval(1000); // ****4 Convert Observable toSignal
   interval  = toSignal(this.interval$);
  destroyRef = inject(DestroyRef);
  customInterval$ = new Observable((subscriber) => { // ****5 Custom Observables
    let timesRan = 0;
    const interval = setInterval(() => {
      if (timesRan > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      subscriber.next({ customObserver: interval }); // send any data
      timesRan++;
    }, 1000);
  });

  constructor() {
    // *1 Signals(): detect change with effects. setInterval() always runs regardless of listeners
    effect(() => {
      console.log(                '[Signal] (Clicks):' + this.count()),
      console.log('[Observable] to [Signal] (Clicks):' + this.count());
    });
  }

  ngOnInit() {
    // **2 Observables(): detect change via subscriptions. Interval() runs with 1+ subscriber
    const observerSubscription = interval(3000)
      .pipe(map((v) => v * 3)) // *Operators: map (imported) transforms values
      .subscribe({
            next: (v) => console.log('[Observable] (Interval):', v), // main function
        complete: ()  => console.log('Subscription completed operation'),
           error: ()  => console.log('Error!'),
      });
    // ***3 Convert signal toObservable
    const signalToObserverSubscription = this.count$.subscribe({
      next: (v) => console.log('[Signal] to [Observable] (Clicks):', v),
    });
    // **** 5 Custom Observable
    const customObservalbeSubscription = this.customInterval$.subscribe({
          next: (v) => console.log('[Custom][Observable]', v),
      complete: ()  => console.log('Subscription finished')
    })

    this.destroyRef.onDestroy(() => {
              observerSubscription.unsubscribe();
      signalToObserverSubscription.unsubscribe();
      customObservalbeSubscription.unsubscribe();
    }); // clean up in any case
  }

  onClick() {
    this.count.update(p => p + 1);
  }
}
