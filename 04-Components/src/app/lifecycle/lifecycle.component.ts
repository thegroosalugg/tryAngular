import {
  Component,
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
  input,
} from '@angular/core';

const  log = (...data: any[]) => console.log(...data);
const rand = () => +(Math.random() * 100).toFixed();

@Component({
     selector: 'app-lifecycle',
      imports: [],
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

  constructor()                       { log('CONSTRUCTOR'           )}
  ngOnInit()                          { log('ngOnInit'              )}
  ngOnChanges(changes: SimpleChanges) { log('ngOnChanges\n', changes)}
  ngDoCheck()                         { log('ngDoCheck'             )}
  ngAfterContentInit()                { log('ngAfterContentInit'    )}
  ngAfterContentChecked()             { log('ngAfterContentChecked' )}
  ngAfterViewInit()                   { log('ngAfterViewInit'       )}
  ngAfterViewChecked()                { log('ngAfterViewChecked'    )}
  ngOnDestroy()                       { log('ngOnDestroy'           )}
}
