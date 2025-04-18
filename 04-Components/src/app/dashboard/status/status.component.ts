import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
     selector: 'app-status',
      imports: [],
  templateUrl: './status.component.html',
     styleUrl: './status.component.scss',
})
// Class 'implements' OnInit (type) throws TS warning when ngOnInit is missing or mispelled
export class StatusComponent implements OnInit, OnDestroy {
  status   = signal<'online' | 'offline' | 'restarting'>('online');
  // interval = signal<ReturnType<typeof setInterval> | null>(null); // with ngOnDestroy()
  element  = inject(DestroyRef); // or inject with constructor()

  constructor() {
    // effects can be set up inside constructor - they subscribe to signal changes
    effect((onCleanup) => {
      console.log('[effect]: status', this.status());

      const timer = setTimeout(() => {
        console.log('[effect]: timer');
      }, 1000);

      onCleanup(() => { // clean up effects
        clearTimeout(timer);
        console.log('onCleanup', timer);
      });
    });
  }

  // ngOnInit runs once after inputs initialised and has access to their values
  ngOnInit() { // better than constructor() {}
    const interval = setInterval(() => {
      const rand = Math.random();
      if      (rand > 0.5) this.status.set('online');
      else if (rand < 0.1) this.status.set('offline');
      else                 this.status.set('restarting');
    }, 5000);

    // modern onDestroy method: Angular >= 16
    this.element.onDestroy(() => clearInterval(interval));
    // this.interval.set(interval); // with ngOnDestroy()
  }

  ngOnDestroy() { // traditional clean-up hook: Angular < 16
    // clearInterval(this.interval()!); // prevent memory leak - clearInterval on dismount
    // console.log('[DISMOUNT] Interval:', this.interval())
  }
}
