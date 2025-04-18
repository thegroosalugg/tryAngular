import {
  Component,
  input,
  signal,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
  afterRender,
  afterNextRender,
} from '@angular/core';
import { StatusComponent } from 'app/dashboard/status/status.component';

const  log = (...data: any[]) => console.log(...data);
const rand = () => +(Math.random() * 100).toFixed();

@Component({
     selector: 'app-lifecycle',
      imports: [StatusComponent],
  templateUrl: './lifecycle.component.html',
     styleUrl: './lifecycle.component.scss',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  isVisible = signal(false);
  number    = signal(rand());
  text      = input.required();

  onToggle() {
    console.clear();
    this.isVisible.set(!this.isVisible());
  }

  onRandom() {
    console.clear();
    this.number.set(rand());
  }

  constructor() {
    // Angular 17+ lifecycle methods: runs inside constructor & expects function arg
        afterRender(() => log('afterRender')); // runs every time all components rendered
    afterNextRender(() => log('afterRender')); // runs once the next time all comps. rend.
    // unlike other lifecycle methods, these listen to the whole app, not just this comp.
  }

  ngOnInit()                          { log('ngOnInit'              )}
  ngOnChanges(changes: SimpleChanges) { log('ngOnChanges\n', changes)}
  ngDoCheck()                         { log('ngDoCheck'             )}
  ngAfterContentInit()                { log('ngAfterContentInit'    )}
  ngAfterContentChecked()             { log('ngAfterContentChecked' )}
  ngAfterViewInit()                   { log('ngAfterViewInit'       )}
  ngAfterViewChecked()                { log('ngAfterViewChecked'    )}
  ngOnDestroy()                       { log('ngOnDestroy'           )}
}
