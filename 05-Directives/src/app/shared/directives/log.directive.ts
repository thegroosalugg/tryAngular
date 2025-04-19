import { Directive, ElementRef } from '@angular/core';

// #THIS IS A HOST DIRECTIVE:
// Injects into other directives/components so that it is automatically added to the host
@Directive({
  selector: '[appLog]',
      host: { '(click)': 'log()' },
})
export class LogDirective {
  constructor(private element: ElementRef) {}

  log() {
    console.log('Clicked:', this.element.nativeElement);
  }
}
