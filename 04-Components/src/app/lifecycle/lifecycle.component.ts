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
import { RectComponent } from './rect/rect.component';
import { ControlComponent } from 'app/shared/control/control.component';

const  log = (...data: any[]) => console.log(...data);
const rand = () => +(Math.random() * 100).toFixed();

@Component({
     selector: 'app-lifecycle',
      imports: [StatusComponent, RectComponent, ControlComponent],
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
  component = signal<'test' | 'rect' | undefined>(undefined);
  number    = signal(rand());
  text      = input.required();
  size      = signal({ height: 200, width: 200 });

  onToggle(path?: 'test' | 'rect') {
    console.clear();
    this.component.update((prev) => path === prev ? undefined : path);
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
