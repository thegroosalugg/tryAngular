import { Directive, ElementRef, inject, input } from '@angular/core';
// Directives enhance native HTML elements. They're like Components, apart they don't have a template
@Directive({ // prepend directives with 'app' is convention
  selector: 'a[appLink]', // set attribute used on an HTML element to activate. <a> locks anchor
  host: {
    '(click)': 'confirm($event)' // customise host event listeners - set per Angular syntax
  }
})
export class LinkDirective {
  // you can use alias to rename this input the same as selector to simplify its use
  query = input('myApp', { alias: 'appLink' }); // <a appLink='queryParam'>
  // aliased inputs lose their default value when set without a value <a appLink> = ''
  // anchor = inject<ElementRef<HTMLAnchorElement>>(ElementRef); // alternative way to inject

  constructor(private anchor: ElementRef) { // inject with constructor
    // the element data can also be got via Injecting, not just event.target
    console.log(this.anchor.nativeElement.href);
  }

  confirm(e: MouseEvent & { target: HTMLAnchorElement }) {
    const hasConfirmed = window.confirm('Are you sure?');
    if (hasConfirmed) { // fallback here when using alias: input default values don't apply
      e.target.href = `${e.target.href}?from=${this.query() || 'myApp'}`; // adds a query param for next host
      return; // do not prevent Default => leave page
    }
    e.preventDefault(); // stay on page
  }
}
